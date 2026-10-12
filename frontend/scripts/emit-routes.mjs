import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  applyRouteMeta,
  listStaticRoutes,
  notFoundRoute,
  routeIndexPath
} from "../src/data/staticRoutes.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BUILD = join(ROOT, "build");

const pkg = JSON.parse(await readFile(join(ROOT, "package.json"), "utf8"));
if (!pkg.homepage) {
  throw new Error("frontend/package.json homepage is required to emit route shells");
}

const shell = await readFile(join(BUILD, "index.html"), "utf8");

await Promise.all(listStaticRoutes().map(async (entry) => {
  const target = join(BUILD, routeIndexPath(entry.path));
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, applyRouteMeta(shell, entry, pkg.homepage));
}));

await writeFile(join(BUILD, "404.html"), applyRouteMeta(shell, notFoundRoute, pkg.homepage));
