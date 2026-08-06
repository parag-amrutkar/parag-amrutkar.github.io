#!/usr/bin/env node
/**
 * Generates the Field Notes plate set with Gemini image models.
 *
 * Two backends, same models, same request shape -- they differ only in how
 * they authenticate and where they are addressed:
 *
 *   Vertex AI (billed to a GCP project, so GCP credits apply):
 *     gcloud auth login
 *     export VERTEX_PROJECT="your-gcp-project-id"
 *     node scripts/generate-illustrations.mjs
 *
 *   Gemini Developer API (billed to an AI Studio key):
 *     export GEMINI_API_KEY="..."          # never commit this
 *     node scripts/generate-illustrations.mjs
 *
 * Vertex wins if VERTEX_PROJECT is set. Override with ILLUSTRATION_PROVIDER
 * =vertex|gemini.
 *
 *     node scripts/generate-illustrations.mjs              # all plates
 *     node scripts/generate-illustrations.mjs hero-two-modes   # one plate
 *     node scripts/generate-illustrations.mjs --force      # redo existing
 *
 * Writes public/illustrations/<name>@2x.png (full size), <name>.png (half),
 * and .webp beside each. Figure.jsx expects both formats to exist as a pair;
 * if a .webp is missing the browser errors on the <picture> source and the
 * component falls back to its plate frame, so a partial run degrades to the
 * designed empty state rather than a broken image.
 *
 * Style is locked by generating the hero first and passing it back as a
 * reference image for every other plate. Without that, ten independently
 * generated illustrations look like ten different illustrators.
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  PLATES,
  PALETTE,
  STYLE,
  CONSTRAINTS,
  RECOLOR
} from "./illustration-prompts.mjs";

const run = promisify(execFile);
const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(HERE, "..", "public", "illustrations");

const API_KEY = process.env.GEMINI_API_KEY;
const PROJECT = process.env.VERTEX_PROJECT || process.env.GOOGLE_CLOUD_PROJECT;

// "global" routes to the shared multi-region pool, which has the widest
// model availability and no per-region capacity surprises. Pin a region
// (us-central1, europe-west4, ...) only if data residency requires it.
const LOCATION = process.env.VERTEX_LOCATION || "global";

const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";

const PROVIDER =
  process.env.ILLUSTRATION_PROVIDER || (PROJECT ? "vertex" : API_KEY ? "gemini" : null);

const REFERENCE_PLATE = "hero-two-modes";

/**
 * Vertex addresses models by project and location and authenticates with a
 * short-lived OAuth bearer token; the Developer API uses a bare key on the
 * query string. Everything past this boundary is identical.
 */
const backend = {
  vertex: {
    url: () => {
      const host =
        LOCATION === "global"
          ? "aiplatform.googleapis.com"
          : `${LOCATION}-aiplatform.googleapis.com`;
      return (
        `https://${host}/v1/projects/${PROJECT}/locations/${LOCATION}` +
        `/publishers/google/models/${MODEL}:generateContent`
      );
    },
    headers: async () => {
      let token;
      try {
        ({ stdout: token } = await run("gcloud", ["auth", "print-access-token"]));
      } catch (error) {
        throw new Error(
          "Could not get a Google Cloud access token.\n\n" +
            "  gcloud auth login\n\n" +
            "If you are already logged in, the refresh token has expired " +
            "(gcloud reports 'invalid_grant') and the same command fixes it.\n\n" +
            `gcloud said: ${(error.stderr || error.message).trim().split("\n")[0]}`
        );
      }
      return { Authorization: `Bearer ${token.trim()}` };
    }
  },
  gemini: {
    url: () =>
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}` +
      `:generateContent?key=${API_KEY}`,
    headers: async () => ({})
  }
};

const args = process.argv.slice(2);
const force = args.includes("--force");
const recolor = args.includes("--recolor");
const only = args.filter((a) => !a.startsWith("--"));

const exists = (p) =>
  access(p).then(
    () => true,
    () => false
  );

// PALETTE and STYLE lead, then the subject. Order matters: contact-signal's
// subject explicitly overrides the palette's ground and ink roles, and an
// override has to arrive after the rule it overrides to be read as one.
const buildPrompt = (plate) =>
  [
    PALETTE,
    STYLE,
    `SUBJECT: ${plate.subject.trim().replace(/\s+/g, " ")}`,
    CONSTRAINTS
  ].join("\n\n");

async function generate(plate, { referencePng, sourcePng, authHeaders }) {
  const parts = sourcePng
    ? [
        // Recolour: the drawing itself is the input, and the instruction is
        // scoped to colour only.
        { inlineData: { mimeType: "image/png", data: sourcePng.toString("base64") } },
        { text: `${RECOLOR}\n\n${PALETTE}` }
      ]
    : [{ text: buildPrompt(plate) }];

  if (!sourcePng && referencePng) {
    parts.unshift({
      inlineData: { mimeType: "image/png", data: referencePng.toString("base64") }
    });
    parts.push({
      text:
        "Match the drawing style, line weight, palette, paper texture, and " +
        "level of detail of the reference image exactly. Only the subject " +
        "changes."
    });
  }

  const res = await fetch(backend[PROVIDER].url(), {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({
      contents: [{ role: "user", parts }],
      generationConfig: {
        responseModalities: ["IMAGE"],
        imageConfig: { aspectRatio: plate.aspect }
      }
    })
  });

  if (!res.ok) {
    const body = await res.text();
    // The two most common Vertex first-run failures have specific fixes;
    // a raw 403 body buries them in a wall of JSON.
    if (PROVIDER === "vertex" && res.status === 403) {
      throw new Error(
        `${plate.name}: Vertex returned 403.\n\n` +
          "  gcloud services enable aiplatform.googleapis.com " +
          `--project=${PROJECT}\n\n` +
          "Also confirm the account has roles/aiplatform.user on the " +
          "project, and that billing is linked.\n\n" +
          body
      );
    }
    if (PROVIDER === "vertex" && res.status === 404) {
      throw new Error(
        `${plate.name}: model "${MODEL}" not found at location ` +
          `"${LOCATION}".\n\nTry VERTEX_LOCATION=us-central1, or set ` +
          "GEMINI_IMAGE_MODEL to a model your project can reach.\n\n" +
          body
      );
    }
    throw new Error(`${plate.name}: HTTP ${res.status} — ${body}`);
  }

  const body = await res.json();
  const image = body?.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);

  if (!image) {
    // A refusal or a text-only reply lands here. Surface it rather than
    // writing a zero-byte file that looks like a successful run.
    const text = body?.candidates?.[0]?.content?.parts?.find((p) => p.text)?.text;
    throw new Error(
      `${plate.name}: no image in response${text ? ` — model said: ${text}` : ""}`
    );
  }

  return Buffer.from(image.inlineData.data, "base64");
}

/**
 * Downscale with sips (ships with macOS), encode WebP with cwebp.
 *
 * sips lists webp as a supported format but reads it only -- it is not
 * marked Writable, and `sips -s format webp` silently produces nothing. cwebp
 * (brew install webp) is the encoder; checkTools() refuses to start without
 * it rather than letting the run finish with half a plate set.
 */
async function derive(name) {
  const at2x = join(OUT_DIR, `${name}@2x.png`);
  const at1x = join(OUT_DIR, `${name}.png`);

  const { stdout } = await run("sips", ["-g", "pixelWidth", at2x]);
  const width = Number(stdout.match(/pixelWidth:\s*(\d+)/)?.[1]);
  if (!width) throw new Error(`${name}: could not read width from sips`);

  await run("sips", ["-Z", String(Math.round(width / 2)), at2x, "--out", at1x]);

  // Lossy at high quality: these plates carry paper grain, which lossless
  // WebP encodes very poorly (it is tuned for flat synthetic colour).
  for (const [src, dest] of [
    [at2x, join(OUT_DIR, `${name}@2x.webp`)],
    [at1x, join(OUT_DIR, `${name}.webp`)]
  ]) {
    await run("cwebp", ["-quiet", "-q", "86", src, "-o", dest]);
  }

  // Figure.jsx emits a <picture> whose WebP <source> wins on every modern
  // browser. If the .webp were missing the browser would error on the source
  // rather than falling back to the .png, so the pair must be complete.
  for (const file of [at1x, at2x, `${at1x.slice(0, -4)}.webp`, `${at2x.slice(0, -4)}.webp`]) {
    if (!(await exists(file))) throw new Error(`${name}: expected output missing — ${file}`);
  }
}

async function checkTools() {
  for (const [bin, hint] of [
    ["sips", "sips ships with macOS; on Linux use ImageMagick instead"],
    ["cwebp", "install with: brew install webp"]
  ]) {
    try {
      await run("which", [bin]);
    } catch {
      throw new Error(`Required tool "${bin}" not found. ${hint}`);
    }
  }
}

async function main() {
  if (!PROVIDER) {
    console.error(
      "No image backend configured. Pick one:\n\n" +
        "  Vertex AI (billed to a GCP project, so GCP credits apply)\n" +
        "    gcloud auth login\n" +
        '    export VERTEX_PROJECT="your-gcp-project-id"\n\n' +
        "  Gemini Developer API (billed to an AI Studio key)\n" +
        '    export GEMINI_API_KEY="your-key"\n\n' +
        "The site renders labelled plate frames wherever art is missing, so " +
        "it stays presentable until this runs."
    );
    process.exit(1);
  }

  if (PROVIDER === "vertex" && !PROJECT) {
    throw new Error(
      'Provider is "vertex" but VERTEX_PROJECT (or GOOGLE_CLOUD_PROJECT) is not set.'
    );
  }
  if (PROVIDER === "gemini" && !API_KEY) {
    throw new Error('Provider is "gemini" but GEMINI_API_KEY is not set.');
  }

  await checkTools();

  // Resolved once: an access token outlives a run of this length, and
  // failing here beats failing after the first plate has been billed.
  const authHeaders = await backend[PROVIDER].headers();

  console.log(
    PROVIDER === "vertex"
      ? `Vertex AI · project ${PROJECT} · ${LOCATION} · ${MODEL}\n`
      : `Gemini Developer API · ${MODEL}\n`
  );

  await mkdir(OUT_DIR, { recursive: true });

  const queue = only.length
    ? PLATES.filter((p) => only.includes(p.name))
    : PLATES;

  if (only.length && queue.length !== only.length) {
    const known = PLATES.map((p) => p.name).join(", ");
    throw new Error(`Unknown plate name. Known plates: ${known}`);
  }

  // Sort so the reference plate is produced before anything that depends on
  // it, regardless of the order the caller asked for.
  queue.sort((a, b) => (a.name === REFERENCE_PLATE ? -1 : b.name === REFERENCE_PLATE ? 1 : 0));

  let reference = null;
  const refPath = join(OUT_DIR, `${REFERENCE_PLATE}@2x.png`);
  if (await exists(refPath)) reference = await readFile(refPath);

  for (const plate of queue) {
    const target = join(OUT_DIR, `${plate.name}@2x.png`);
    const present = await exists(target);

    if (recolor && !present) {
      console.log(`· ${plate.name} — nothing to recolour, skipping`);
      continue;
    }

    if (!recolor && !force && present) {
      console.log(`· ${plate.name} — exists, skipping (use --force to redo)`);
      if (plate.name === REFERENCE_PLATE) reference = await readFile(target);
      continue;
    }

    const useRef = !recolor && plate.ref ? reference : null;
    if (!recolor && plate.ref && !useRef) {
      console.warn(
        `! ${plate.name} — no reference plate yet; generate ${REFERENCE_PLATE} ` +
          `first or this plate will not match the set`
      );
    }

    process.stdout.write(
      `· ${plate.name} — ${recolor ? "recolouring" : "generating"}… `
    );

    const png = await generate(plate, {
      referencePng: useRef,
      sourcePng: recolor ? await readFile(target) : null,
      authHeaders
    });

    await writeFile(target, png);
    await derive(plate.name);
    console.log("done");

    if (plate.name === REFERENCE_PLATE) reference = png;
  }

  console.log(`\nWrote to ${OUT_DIR}`);
  console.log("Check the palette before generating the rest:  yarn palette-check");
  if (queue.some((p) => p.name === REFERENCE_PLATE) && !only.length) {
    console.log(
      "Review hero-two-modes first — it is the style reference every other " +
        "plate is matched against."
    );
  }
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exit(1);
});
