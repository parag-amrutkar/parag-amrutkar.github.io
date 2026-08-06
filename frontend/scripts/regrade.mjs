#!/usr/bin/env node
/**
 * Snaps a generated plate onto the site's colour tokens, deterministically.
 *
 *   node scripts/regrade.mjs                 # every plate present
 *   node scripts/regrade.mjs hero-two-modes
 *   node scripts/regrade.mjs --dry-run       # report, write nothing
 *
 * Why this exists: image models cannot hit a specified hex. Asking the model
 * to recolour got terracotta most of the way there but barely moved the paper,
 * ink or green, and each attempt costs a call and risks the linework. The
 * remaining errors are systematic -- a yellow cast on the ground, a green
 * "black", a washed accent -- so they are better fixed in code, once, for
 * every plate.
 *
 * Method: measure where the plate's own colour families actually sit, then
 * apply a smooth displacement through colour space that carries each family
 * onto its target. Each pixel moves by an inverse-distance-weighted blend of
 * the anchor corrections, so a pixel sitting on an anchor lands exactly on
 * target while everything between moves proportionally.
 *
 * It displaces rather than replaces on purpose. Mapping pixels directly onto
 * the four target colours would posterise the plate -- paper tooth, pencil
 * under-drawing, hatching density and antialiased edges are all mid-tones
 * between anchors, and they carry the hand-drawn quality. Displacement keeps
 * every one of those relationships and just moves the whole neighbourhood.
 *
 * Running it twice is close to a no-op: the second pass measures colours that
 * are already on target, so the corrections it computes are ~0.
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { writeFile, readdir, copyFile, access, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

import {
  TOKENS,
  readBitmap,
  sampleAnchors,
  pixelAt,
  toRgb,
  toHex,
  distance
} from "./lib/plate-colors.mjs";
import { derivePlate } from "./lib/derive.mjs";

const run = promisify(execFile);
const HERE = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(HERE, "..", "public");
const OUT_DIR = join(PUBLIC_DIR, "illustrations");

// Deliberately outside public/. Anything under public/ is copied verbatim
// into the build, so keeping ~1.3 MB originals beside the plates would ship
// a second, unused copy of the whole illustration set to visitors.
const BACKUP_DIR = join(HERE, "..", ".plate-originals");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const only = args.filter((a) => !a.startsWith("--"));

const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);

/**
 * Inverse-distance weighting. Squared falloff keeps corrections local: a
 * pixel near the paper anchor is dominated by the paper correction rather
 * than dragged by the ink one.
 */
const POWER = 2;
const EPS = 1;

function buildCorrections(anchors, inverted) {
  const pairs = [];
  const add = (from, toHexStr) => {
    if (from) pairs.push({ from, delta: toRgb(toHexStr).map((t, i) => t - from[i]) });
  };

  add(anchors.ground, inverted ? TOKENS.ink : TOKENS.paper);
  add(anchors.line, inverted ? TOKENS.paper : TOKENS.ink);
  add(anchors.green, TOKENS.green);
  add(anchors.terracotta, TOKENS.terracotta);

  return pairs;
}

function regradePixels(bmp, corrections) {
  const { buf, width, height } = bmp;
  const n = corrections.length;
  const w = new Float64Array(n);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = pixelAt(bmp, x, y);
      const r = buf[i + 2], g = buf[i + 1], b = buf[i];

      let total = 0;
      for (let k = 0; k < n; k++) {
        const c = corrections[k].from;
        const d2 = (r - c[0]) ** 2 + (g - c[1]) ** 2 + (b - c[2]) ** 2;
        const weight = 1 / (Math.pow(d2, POWER / 2) + EPS);
        w[k] = weight;
        total += weight;
      }

      let dr = 0, dg = 0, db = 0;
      for (let k = 0; k < n; k++) {
        const f = w[k] / total;
        const d = corrections[k].delta;
        dr += f * d[0];
        dg += f * d[1];
        db += f * d[2];
      }

      buf[i + 2] = clamp(Math.round(r + dr));
      buf[i + 1] = clamp(Math.round(g + dg));
      buf[i] = clamp(Math.round(b + db));
    }
  }
}

async function main() {
  let files;
  try {
    files = (await readdir(OUT_DIR))
      .filter((f) => f.endsWith("@2x.png"))
      .map((f) => f.replace("@2x.png", ""));
  } catch {
    console.error(`No illustrations directory at ${OUT_DIR}`);
    process.exit(1);
  }

  const names = only.length ? files.filter((f) => only.includes(f)) : files;
  if (!names.length) {
    console.error("No matching plates found.");
    process.exit(1);
  }

  for (const name of names) {
    const inverted = name === "contact-signal";
    const at2x = join(OUT_DIR, `${name}@2x.png`);

    // Keep the model's output so a regrade can always be undone without
    // spending another API call.
    const original = join(BACKUP_DIR, `${name}@2x.png`);
    if (!dryRun && !(await access(original).then(() => true, () => false))) {
      await mkdir(BACKUP_DIR, { recursive: true });
      await copyFile(at2x, original);
    }

    const bmp = await readBitmap(at2x);
    const anchors = sampleAnchors(bmp, inverted);
    const corrections = buildCorrections(anchors, inverted);

    console.log(`\n${name}${inverted ? "  (inverted)" : ""}`);
    for (const c of corrections) {
      const target = c.from.map((v, i) => v + c.delta[i]);
      console.log(
        `  ${toHex(c.from)} -> ${toHex(target)}   moved ${String(
          distance(c.from, target)
        ).padStart(3)}`
      );
    }

    if (dryRun) continue;

    regradePixels(bmp, corrections);

    // Write the modified buffer back and let sips convert. The header is
    // untouched, so no BMP writer is needed here.
    const tmp = join(tmpdir(), `regrade-${process.pid}.bmp`);
    await writeFile(tmp, bmp.buf);
    await run("sips", ["-s", "format", "png", tmp, "--out", at2x]);
    // Regrading changes the master's colours, so every derivative -- and the
    // social card cropped from the og plate -- has to be rebuilt from it.
    await derivePlate(name, OUT_DIR, PUBLIC_DIR);
    console.log("  written");
  }

  console.log(
    dryRun
      ? "\nDry run — nothing written.\n"
      : "\nDone. Verify with:  yarn palette-check\n" +
          `Model originals kept in ${BACKUP_DIR.replace(/.*\/frontend\//, "")}\n`
  );
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exit(1);
});
