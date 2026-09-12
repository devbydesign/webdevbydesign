import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
const configuredBase = (process.env.SITE_BASE || "").replace(/\/$/, "");
const htmlFiles = [];
const builtFiles = new Set();
const walk = async (directory) => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(target);
    else {
      builtFiles.add(path.relative(root, target).split(path.sep).join("/"));
      if (entry.name.endsWith(".html")) htmlFiles.push(target);
    }
  }
};
await walk(root);

const failures = [];
const localTarget = (value) => {
  const url = new URL(value, "https://webdevbydesign.com");
  if (url.origin !== "https://webdevbydesign.com") return null;
  const pathname = configuredBase && (url.pathname === configuredBase || url.pathname.startsWith(`${configuredBase}/`))
    ? url.pathname.slice(configuredBase.length) || "/"
    : url.pathname;
  const relativePath = decodeURIComponent(pathname).replace(/^\/+/, "");
  if (relativePath === "404/") return "404.html";
  if (!relativePath || relativePath.endsWith("/")) return `${relativePath}index.html`;
  return path.posix.extname(relativePath) ? relativePath : `${relativePath}.html`;
};

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const relative = path.relative(root, file).split(path.sep).join("/");
  const isRedirect = relative.startsWith("author/") || relative.startsWith("category/") || relative.startsWith("2023/");
  if (!isRedirect && !/<html[^>]+lang="en"/.test(html)) failures.push(`${relative}: missing document language`);
  if (!isRedirect && !/<title>[^<]+<\/title>/.test(html)) failures.push(`${relative}: missing title`);
  if (!isRedirect && !/<meta name="description" content="[^"]+"/.test(html)) failures.push(`${relative}: missing description`);
  if (!isRedirect) {
    const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;
    if (h1Count !== 1) failures.push(`${relative}: expected one H1, found ${h1Count}`);
  }
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(?:mailto:|tel:|data:|#|javascript:)/.test(value)) continue;
    const target = localTarget(value);
    if (target && !builtFiles.has(target)) failures.push(`${relative}: missing local target ${value}`);
  }
}

if (failures.length) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`Validated ${htmlFiles.length} generated HTML files with no missing local targets.\n`);
}
