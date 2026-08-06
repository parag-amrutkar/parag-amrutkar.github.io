/**
 * Shared colour measurement for the plate set.
 *
 * PNG has no decoder in the Node standard library, so images are converted to
 * an uncompressed BMP with sips and read directly -- past the header a BMP is
 * just padded rows of BGR bytes. Keeps every script here dependency-free.
 *
 * The buffer is returned intact so callers can rewrite pixels in place and
 * convert straight back, without having to author a BMP header.
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFile, unlink } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

const run = promisify(execFile);

export const TOKENS = {
  paper: "#f7f3ec",
  ink: "#192421",
  green: "#325b50",
  terracotta: "#9b5632"
};

export const toRgb = (hex) => hex.match(/\w\w/g).map((h) => parseInt(h, 16));

export const toHex = (rgb) =>
  "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

export const distance = (a, b) =>
  Math.round(Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]));

export const luma = (p) => 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2];

const median = (arr, k) =>
  arr.map((p) => p[k]).sort((a, b) => a - b)[Math.floor(arr.length / 2)];

const mean = (arr) =>
  [0, 1, 2].map((k) => arr.reduce((s, p) => s + p[k], 0) / arr.length);

/**
 * @param {string} pngPath
 * @param {number} [maxDim] downsample for measurement; omit for full size
 */
export async function readBitmap(pngPath, maxDim) {
  const bmp = join(tmpdir(), `plate-${process.pid}-${Math.abs(hash(pngPath))}.bmp`);
  const args = maxDim ? ["-Z", String(maxDim)] : [];
  await run("sips", [...args, "-s", "format", "bmp", pngPath, "--out", bmp]);

  const buf = await readFile(bmp);
  await unlink(bmp).catch(() => {});

  if (buf.toString("latin1", 0, 2) !== "BM") throw new Error("not a BMP");

  const offset = buf.readUInt32LE(10);
  const width = buf.readInt32LE(18);
  // sips writes top-down rows (negative height). Only aggregate statistics
  // are taken from this, so row order does not matter -- but the sign has to
  // be dropped before it is used as a count.
  const height = Math.abs(buf.readInt32LE(22));
  const bpp = buf.readUInt16LE(28);
  if (bpp !== 24 && bpp !== 32) throw new Error(`unexpected ${bpp}bpp BMP`);
  if (buf.readUInt32LE(30) !== 0) throw new Error("compressed BMP not supported");

  const bytes = bpp / 8;
  const stride = Math.ceil((width * bytes) / 4) * 4;

  return { buf, offset, width, height, bytes, stride };
}

const hash = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
};

/** Index of the blue byte for pixel (x, y); RGB run backwards from there. */
export const pixelAt = (bmp, x, y) => bmp.offset + y * bmp.stride + x * bmp.bytes;

export function toPixels(bmp) {
  const { buf, width, height } = bmp;
  const px = new Array(width * height);
  let n = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = pixelAt(bmp, x, y);
      px[n++] = [buf[i + 2], buf[i + 1], buf[i]];
    }
  }
  return px;
}

/**
 * Locates the four colour families actually present in a plate.
 *
 * `inverted` swaps the ground and line roles for contact-signal, which is
 * drawn cream-on-dark rather than dark-on-cream.
 */
export function sampleAnchors(bmp, inverted = false) {
  const { width, height } = bmp;
  const px = toPixels(bmp);

  // Ground: the outer border, which is margin on every plate.
  const edge = [];
  for (let x = 0; x < width; x++) {
    for (const y of [0, 1, height - 1, height - 2]) edge.push(px[y * width + x]);
  }
  const ground = [median(edge, 0), median(edge, 1), median(edge, 2)];

  const darks = px.filter((p) => luma(p) < 90).sort((a, b) => luma(a) - luma(b));
  const lights = px.filter((p) => luma(p) > 170).sort((a, b) => luma(b) - luma(a));
  const greens = px.filter((p) => p[1] > p[0] + 12 && p[1] > p[2] + 6 && luma(p) < 165);
  const warms = px.filter((p) => p[0] > p[1] + 22 && p[0] > p[2] + 22 && luma(p) < 200);

  // Extreme decile only, at whichever end the line work sits. Mid-tone pixels
  // are line blended into ground by antialiasing; averaging them in reports
  // the ink far too light on a cream plate, and the cream far too dark on the
  // inverted one. Both ends get the same treatment.
  const decile = (arr) => arr.slice(0, Math.max(1, Math.floor(arr.length * 0.1)));
  const lineSet = decile(inverted ? lights : darks);

  // Proportional, not absolute. An accent covering a handful of pixels is
  // antialiasing noise, not a region: plate-product is drawn green-only, yet
  // 251 stray warm pixels out of a million were enough to trip a fixed
  // threshold of 20 and report a terracotta that is not there.
  const PRESENT = px.length * 0.001;

  return {
    ground,
    line: lineSet.length ? mean(lineSet) : null,
    green: greens.length > PRESENT ? mean(greens) : null,
    terracotta: warms.length > PRESENT ? mean(warms) : null,
    counts: { total: px.length, green: greens.length, warm: warms.length }
  };
}
