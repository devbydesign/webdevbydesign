import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
const configuredBase = (process.env.SITE_BASE || "").replace(/\/$/, "");
const htmlFiles = [];
const walk = async (directory) => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(target);
    else if (entry.name.endsWith(".html")) htmlFiles.push(target);
  }
};
await walk(root);

const failures = [];
const exists = async (target) => { try { return (await stat(target)).isFile(); } catch { return false; } };
const localTarget = (value) => {
  const url = new URL(value, "https://webdevbydesign.com");
  if (url.origin !== "https://webdevbydesign.com") return null;
  const pathname = configuredBase && (url.pathname === configuredBase || url.pathname.startsWith(`${configuredBase}/`))
    ? url.pathname.slice(configuredBase.length) || "/"
    : url.pathname;
  if (pathname === "/404/") return path.join(root, "404.html");
  if (pathname.endsWith("/")) return path.join(root, pathname, "index.html");
  const direct = path.join(root, pathname);
  return path.extname(pathname) ? direct : `${direct}.html`;
};

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const relative = path.relative(root, file);
  const isRedirect = relative.includes("author\\") || relative.includes("category\\") || relative.includes("2023\\");
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
    if (target && !(await exists(target))) failures.push(`${relative}: missing local target ${value}`);
  }
}

if (failures.length) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`Validated ${htmlFiles.length} generated HTML files with no missing local targets.\n`);
}
