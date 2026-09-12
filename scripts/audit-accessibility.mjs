import { chromium } from "playwright-core";
import axe from "axe-core";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const CHROME_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const baseUrl = process.argv[2] ?? "http://127.0.0.1:4321";
const routes = [
  "/",
  "/about-us/",
  "/portfolio/",
  "/pricing/",
  "/contact-us/",
  "/testimonial/bryan-o/",
  "/testimonial/sherwin-h/",
  "/testimonial/vicki-r/",
  "/testimonial/john-l/",
  "/testimonial/rebecca-b/",
];
const viewports = {
  desktop: { width: 1440, height: 960 },
  mobile: { width: 390, height: 844 },
};

const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
const report = { generatedAt: new Date().toISOString(), baseUrl, results: [] };

for (const [viewportName, viewport] of Object.entries(viewports)) {
  const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
  for (const route of routes) {
    const page = await context.newPage();
    await page.goto(new URL(route, baseUrl).href, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.addScriptTag({ content: axe.source });
    const accessibility = await page.evaluate(async () => window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] },
    }));
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    await page.evaluate(() => {
      const availableScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, Math.ceil(availableScroll / 2) + 2);
    });
    await page.waitForTimeout(75);
    const backToTop = await page.locator("[data-back-to-top]").evaluate((element) => ({
      appearsAtHalfway: element.classList.contains("is-visible") && getComputedStyle(element).pointerEvents !== "none",
    }));
    await page.locator("[data-back-to-top]").click();
    try {
      await page.waitForFunction(() => window.scrollY < 2, undefined, { timeout: 2500 });
      backToTop.returnsToTop = true;
    } catch {
      backToTop.returnsToTop = false;
    }
    report.results.push({
      route,
      viewport: viewportName,
      overflow: dimensions.scrollWidth > dimensions.clientWidth + 1 ? dimensions : null,
      backToTop,
      violations: accessibility.violations.map(({ id, impact, help, helpUrl, nodes }) => ({
        id,
        impact,
        help,
        helpUrl,
        nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
      })),
    });
    await page.close();
  }
  await context.close();
}

await browser.close();
await mkdir(path.resolve("audit/rebuilt-site"), { recursive: true });
await writeFile(path.resolve("audit/rebuilt-site/accessibility-report.json"), `${JSON.stringify(report, null, 2)}\n`);

const failures = report.results.filter((result) => result.overflow || result.violations.length || !result.backToTop.appearsAtHalfway || !result.backToTop.returnsToTop);
const violationCount = report.results.reduce((count, result) => count + result.violations.length, 0);
process.stdout.write(`Audited ${report.results.length} page/viewport combinations; ${violationCount} violation groups; ${failures.filter((result) => result.overflow).length} overflow failures.\n`);
for (const result of failures) {
  if (result.overflow) process.stdout.write(`${result.viewport} ${result.route}: horizontal overflow ${result.overflow.scrollWidth}/${result.overflow.clientWidth}px\n`);
  if (!result.backToTop.appearsAtHalfway || !result.backToTop.returnsToTop) process.stdout.write(`${result.viewport} ${result.route}: back-to-top interaction failed\n`);
  for (const violation of result.violations) process.stdout.write(`${result.viewport} ${result.route}: ${violation.impact ?? "unknown"} ${violation.id} (${violation.nodes.length} node(s))\n`);
}
if (failures.length) process.exitCode = 1;
