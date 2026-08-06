#!/usr/bin/env node
/**
 * Measures generated plates against the site's colour tokens.
 *
 *   node scripts/palette-check.mjs              # every plate present
 *   node scripts/palette-check.mjs hero-two-modes
 *
 * Image models cannot hit an exact hex, so the question is never "is this
 * exact" but "is this close enough that the plate does not fight the page it
 * sits on". Eyeballing a cream against a cream is unreliable; this prints
 * numbers instead.
 *
 * PNG has no decoder in the Node standard library, so the image is converted
 * to a small uncompressed BMP with sips and parsed directly -- BMP after the
 * header is just padded rows of BGR bytes. Keeps the script dependency-free.
 */

import { readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  TOKENS,
  readBitmap,
  sampleAnchors,
  toRgb,
  toHex,
  distance
} from "./lib/plate-colors.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(HERE, "..", "public", "illustrations");

// Paper is judged hardest because it butts directly against the page
// background, where a few points of cast is obvious; accents sit inside the
// drawing and tolerate more drift.
//
// These were loosened once to accommodate what turned out to be a measurement
// fault rather than real error (see readBitmap call below). With measurement
// fixed they are back to values that mean something: a regraded plate lands
// at Δ1-13, so anything past these is genuine drift.
const TOLERANCE = { paper: 8, ink: 28, green: 32, terracotta: 32 };

const row = (label, got, want, tol) => {
  if (!got) return `  ${label.padEnd(12)} —        not found in image`;
  const d = distance(got, toRgb(want));
  const mark = d <= tol ? "ok  " : "OFF ";
  return `  ${label.padEnd(12)} ${mark} ${toHex(got)}  vs ${want}   Δ${String(d).padStart(3)} (tol ${tol})`;
};

async function main() {
  const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));

  let files;
  try {
    files = (await readdir(OUT_DIR))
      .filter((f) => f.endsWith("@2x.png"))
      .map((f) => f.replace("@2x.png", ""));
  } catch {
    console.error(`No illustrations directory yet at ${OUT_DIR}`);
    process.exit(1);
  }

  const names = only.length ? files.filter((f) => only.includes(f)) : files;
  if (!names.length) {
    console.error(only.length ? "No matching plates found." : "No plates generated yet.");
    process.exit(1);
  }

  let failures = 0;

  for (const name of names) {
    const inverted = name === "contact-signal";
    // Full resolution, deliberately. Downsampling first looks like a harmless
    // speed win but is not: thin hatching strokes get blended with the paper
    // behind them, so every accent measures lighter than it is. At 260px this
    // plate reported green Δ54 and ink Δ38; at full size the same pixels are
    // Δ13 and Δ2. The cost is a fraction of a second per plate.
    const bmp = await readBitmap(join(OUT_DIR, `${name}@2x.png`));
    const a = sampleAnchors(bmp, inverted);

    console.log(`\n${name}${inverted ? "  (inverted plate)" : ""}`);
    const groundWant = inverted ? TOKENS.ink : TOKENS.paper;
    const lineWant = inverted ? TOKENS.paper : TOKENS.ink;

    const checks = [
      row("ground", a.ground, groundWant, TOLERANCE.paper),
      row("line/ink", a.line, lineWant, TOLERANCE.ink),
      row("green", a.green, TOKENS.green, TOLERANCE.green),
      row("terracotta", a.terracotta, TOKENS.terracotta, TOLERANCE.terracotta)
    ];
    checks.forEach((c) => console.log(c));
    failures += checks.filter((c) => c.includes("OFF")).length;

    // A plate drawn entirely in one accent is the specific failure that
    // produced a green "ink" on the first run, and it reads as ok on a
    // per-colour check.
    if (a.counts.green > a.counts.total * 0.12) {
      console.log(
        `  ! green covers ${Math.round((100 * a.counts.green) / a.counts.total)}% of the plate ` +
          `— accents should be sparse; check the line work is not drawn in green`
      );
      failures++;
    }
  }

  console.log(
    failures
      ? `\n${failures} issue(s). Fix without another API call:\n` +
          "  yarn regrade <plate-name>          snap colours onto the tokens\n" +
          "If the drawing itself is wrong rather than its colours:\n" +
          "  yarn illustrations --recolor <plate-name>\n"
      : "\nPalette matches within tolerance.\n"
  );
  process.exit(failures ? 1 : 0);
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exit(1);
});
