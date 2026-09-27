/**
 * Derivative outputs for a plate: the 1x PNG and both WebPs.
 *
 * Shared because both generate-illustrations and regrade produce plates, and
 * a plate is not finished until its derivatives match it. Keeping one copy
 * means a regrade cannot leave a stale WebP behind.
 *
 * The social card (public/og-image.jpg) is the homepage hero portrait, not a
 * crop of the og-image plate. Regenerating plates must not replace it.
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { join } from "node:path";

const run = promisify(execFile);

/**
 * Rebuilds everything downstream of a plate's 2x master.
 *
 * Figure.jsx emits a <picture> whose WebP <source> wins on every modern
 * browser. A missing .webp makes the browser error on the source rather than
 * fall back to the .png, so the pair is verified before returning.
 */
export async function derivePlate(name, outDir, _publicDir) {
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
}
