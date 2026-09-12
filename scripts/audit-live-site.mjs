import { chromium } from "playwright-core";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const START_URL = process.argv[2] || "https://webdevbydesign.com/";
const ORIGIN = new URL(START_URL).origin;
const OUTPUT_ROOT = path.resolve(process.argv[3] || "audit/current-site");
const CHROME_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const DESKTOP = { width: 1440, height: 1000 };
const MOBILE = { width: 390, height: 844 };
const MAX_PAGES = 100;

const normalizeUrl = (value, base = ORIGIN) => {
  try {
    const url = new URL(value, base);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    url.hash = "";
    if (ORIGIN === "https://webdevbydesign.com" && url.hostname === "www.webdevbydesign.com") url.hostname = "webdevbydesign.com";
    if (ORIGIN === "https://webdevbydesign.com" && url.hostname === "webdevbydesign.com") {
      url.protocol = "https:";
      url.search = "";
    }
    return url.href;
  } catch {
    return null;
  }
};

const isPageUrl = (url) => {
  const parsed = new URL(url);
  if (parsed.origin !== ORIGIN) return false;
  return !/\.(?:avif|css|gif|ico|jpe?g|js|json|pdf|png|svg|webp|xml|zip)$/i.test(parsed.pathname);
};

const pageSlug = (url) => {
  const pathname = new URL(url).pathname.replace(/^\/+|\/+$/g, "");
  return pathname ? pathname.replace(/[^a-z0-9_-]+/gi, "-") : "home";
};

const captureViewport = async (page, directory, label, scrollTop) => {
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), scrollTop);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(directory, `${label}.jpg`), type: "jpeg", quality: 90 });
};

const inspectPage = async (page, url, viewportName, viewport) => {
  await page.setViewportSize(viewport);
  const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(1200);
  await page.evaluate(async () => {
    const images = [...document.images];
    await Promise.race([
      Promise.all(images.map((image) => image.complete ? null : new Promise((resolve) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      }))),
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ]);
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0));

  const directory = path.join(OUTPUT_ROOT, "screenshots", pageSlug(url), viewportName);
  await mkdir(directory, { recursive: true });
  const dimensions = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    viewportHeight: window.innerHeight,
  }));
  const bottom = Math.max(0, dimensions.height - dimensions.viewportHeight);
  const middle = Math.round(bottom / 2);
  await captureViewport(page, directory, "top", 0);
  await captureViewport(page, directory, "middle", middle);
  await captureViewport(page, directory, "bottom", bottom);
  await page.evaluate(() => window.scrollTo(0, 0));

  const details = await page.evaluate(() => {
    const absolute = (value) => {
      try { return new URL(value, document.baseURI).href; } catch { return value; }
    };
    const visible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    };
    const selectors = "h1,h2,h3,h4,h5,h6,p,a,button,label,input,textarea,nav,header,main,section,article,footer";
    const elements = [...document.querySelectorAll(selectors)].filter(visible).map((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        tag: element.tagName.toLowerCase(),
        text: (element.innerText || element.getAttribute("aria-label") || element.getAttribute("placeholder") || "").trim().replace(/\s+/g, " "),
        id: element.id || null,
        classes: [...element.classList],
        href: element instanceof HTMLAnchorElement ? element.href : null,
        bounds: { x: Math.round(rect.x), y: Math.round(rect.y + scrollY), width: Math.round(rect.width), height: Math.round(rect.height) },
        style: {
          color: style.color,
          backgroundColor: style.backgroundColor,
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
        },
      };
    });
    return {
      title: document.title,
      language: document.documentElement.lang || null,
      canonical: document.querySelector('link[rel="canonical"]')?.href || null,
      description: document.querySelector('meta[name="description"]')?.content || null,
      robots: document.querySelector('meta[name="robots"]')?.content || null,
      openGraph: Object.fromEntries([...document.querySelectorAll('meta[property^="og:"]')].map((meta) => [meta.getAttribute("property"), meta.content])),
      headings: [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].filter(visible).map((heading) => ({ level: Number(heading.tagName[1]), text: heading.innerText.trim().replace(/\s+/g, " ") })),
      links: [...document.querySelectorAll("a[href]")].filter(visible).map((link) => ({ text: link.innerText.trim().replace(/\s+/g, " "), href: absolute(link.getAttribute("href")), target: link.target || null, ariaLabel: link.getAttribute("aria-label") })),
      images: [...document.images].map((image) => ({ src: image.currentSrc || absolute(image.getAttribute("src")), alt: image.alt, width: image.naturalWidth, height: image.naturalHeight, loading: image.loading || null })),
      stylesheets: [...document.querySelectorAll('link[rel="stylesheet"]')].map((link) => link.href),
      scripts: [...document.scripts].map((script) => script.src).filter(Boolean),
      elements,
    };
  });

  return {
    viewport: viewportName,
    requestedUrl: url,
    finalUrl: page.url(),
    status: response?.status() ?? null,
    dimensions,
    ...details,
  };
};

await mkdir(OUTPUT_ROOT, { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
const page = await browser.newPage({ viewport: DESKTOP });
const queue = [START_URL];
const seen = new Set();
const inventory = [];

while (queue.length && seen.size < MAX_PAGES) {
  const url = normalizeUrl(queue.shift());
  if (!url || seen.has(url) || !isPageUrl(url)) continue;
  seen.add(url);
  process.stdout.write(`Auditing ${url}\n`);
  try {
    const desktop = await inspectPage(page, url, "desktop", DESKTOP);
    const mobile = await inspectPage(page, url, "mobile", MOBILE);
    inventory.push({ desktop, mobile });
    for (const link of desktop.links) {
      const normalized = normalizeUrl(link.href, desktop.finalUrl);
      if (normalized && isPageUrl(normalized) && !seen.has(normalized)) queue.push(normalized);
    }
  } catch (error) {
    inventory.push({ requestedUrl: url, error: error instanceof Error ? error.message : String(error) });
  }
}

await browser.close();
await writeFile(path.join(OUTPUT_ROOT, "site-inventory.json"), `${JSON.stringify({ capturedAt: new Date().toISOString(), origin: ORIGIN, pages: inventory }, null, 2)}\n`);
process.stdout.write(`Captured ${inventory.length} pages in ${OUTPUT_ROOT}\n`);
