/**
 * Derivative outputs for a plate: the 1x PNG, both WebPs, and — for the
 * og-image plate only — the social card.
 *
 * Shared because both generate-illustrations and regrade produce plates, and
 * a plate is not finished until its derivatives match it. Keeping one copy
 * means a regrade cannot leave a stale WebP or a stale social card behind.
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { unlink } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

const run = promisify(execFile);

/** The plate whose crop becomes the site's social card. */
export const OG_PLATE = "og-image";

/** Open Graph's expected card size. */
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/**
 * Crops the og plate to the Open Graph ratio and writes public/og-image.jpg.
 *
 * The plate is drawn at 16:9 (1.78:1) but Open Graph wants 1.91:1, so it is
 * cropped rather than squashed — the plates carry wide margins by design, so
 * taking a strip off the top and bottom costs nothing while distorting the
 * drawing would be obvious.
 *
 * JPEG, not PNG: the paper grain is high-frequency noise that lossless PNG
 * cannot compress, which put the card at 958 KB. At quality 90 it is visually
 * identical and about seven times smaller — worth it for a file that link
 * crawlers fetch synchronously.
 */
export async function exportOgCard(at2x, publicDir) {
  const { stdout } = await run("sips", ["-g", "pixelWidth", "-g", "pixelHeight", at2x]);
  const width = Number(stdout.match(/pixelWidth:\s*(\d+)/)?.[1]);
  if (!width) throw new Error("could not read og plate width");

  const cropHeight = Math.round(width / (OG_WIDTH / OG_HEIGHT));
  const tmp = join(tmpdir(), `og-${process.pid}.png`);

  await run("sips", ["-c", String(cropHeight), String(width), at2x, "--out", tmp]);
  await run("sips", [
    "-z", String(OG_HEIGHT), String(OG_WIDTH),
    "-s", "format", "jpeg",
    "-s", "formatOptions", "90",
    tmp,
    "--out", join(publicDir, "og-image.jpg")
  ]);
  await unlink(tmp).catch(() => {});
}

/**
 * Rebuilds everything downstream of a plate's 2x master.
 *
 * Figure.jsx emits a <picture> whose WebP <source> wins on every modern
 * browser. A missing .webp makes the browser error on the source rather than
 * fall back to the .png, so the pair is verified before returning.
 */
export async function derivePlate(name, outDir, publicDir) {
  const at2x = join(outDir, `${name}@2x.png`);
  const at1x = join(outDir, `${name}.png`);

  const { stdout } = await run("sips", ["-g", "pixelWidth", at2x]);
  const width = Number(stdout.match(/pixelWidth:\s*(\d+)/)?.[1]);
  if (!width) throw new Error(`${name}: could not read width from sips`);

  await run("sips", ["-Z", String(Math.round(width / 2)), at2x, "--out", at1x]);

  // Lossy at high quality: these plates carry paper grain, which lossless
  // WebP encodes very poorly (it is tuned for flat synthetic colour).
  for (const [src, dest] of [
    [at2x, join(outDir, `${name}@2x.webp`)],
    [at1x, join(outDir, `${name}.webp`)]
  ]) {
    await run("cwebp", ["-quiet", "-q", "86", src, "-o", dest]);
  }

  for (const file of [`${name}.png`, `${name}@2x.png`, `${name}.webp`, `${name}@2x.webp`]) {
    await run("test", ["-f", join(outDir, file)]).catch(() => {
      throw new Error(`${name}: expected output missing — ${file}`);
    });
  }

  if (name === OG_PLATE && publicDir) await exportOgCard(at2x, publicDir);
}
