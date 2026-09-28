import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { applyJsonLd, renderAgentFiles } from "../src/data/agentDocs.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const PUBLIC_DIR = join(ROOT, "public");
const INDEX_HTML = join(PUBLIC_DIR, "index.html");

const pkg = JSON.parse(await readFile(join(ROOT, "package.json"), "utf8"));
const siteUrl = pkg.homepage;
if (!siteUrl) {
  throw new Error("frontend/package.json homepage is required to build agent documents");
}

const files = renderAgentFiles(siteUrl);
await Promise.all(Object.entries(files).map(async ([relativePath, contents]) => {
  const target = join(PUBLIC_DIR, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents);
}));

const html = await readFile(INDEX_HTML, "utf8");
const next = applyJsonLd(html, siteUrl);
if (next !== html) {
  await writeFile(INDEX_HTML, next);
}
