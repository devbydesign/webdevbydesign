import { chromium } from "playwright-core";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const CHROME_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const root = path.resolve("src/assets/images");

const siteImages = [
  ["brand/logo.png", "https://webdevbydesign.com/wp-content/uploads/2023/07/DevByDesignLogo.png"],
  ["home/hero.png", "https://www.webdevbydesign.com/wp-content/uploads/2024/01/banner-woman-smiling-darkedges2-1536x612.png"],
  ["team/katria.png", "https://webdevbydesign.com/wp-content/uploads/2023/07/KAtria-250-300-profile.png"],
  ["team/monique.jpg", "https://webdevbydesign.com/wp-content/uploads/2023/07/monique-profile-4-3.jpg"],
  ["team/richard.png", "https://webdevbydesign.com/wp-content/uploads/2023/07/Richard-profile.png"],
  ["team/lance.jpg", "https://webdevbydesign.com/wp-content/uploads/2024/01/PXL_20230929_202726411.PORTRAIT-1.jpg"],
  ["partners/stanford.png", "https://www.webdevbydesign.com/wp-content/uploads/elementor/thumbs/cardinal-logo-rquhstmdvk7y2ie951yihzqi9mnpyxgd5g3wsje9cg.png"],
  ["partners/pantheon.png", "https://www.webdevbydesign.com/wp-content/uploads/2024/05/pantheon-logo-sm.png"],
  ["partners/designrush.png", "https://www.webdevbydesign.com/wp-content/uploads/2024/05/Verified-Agency-v2.png"],
  ["partners/rbb.png", "https://www.webdevbydesign.com/wp-content/uploads/2024/05/RBBMarketingLogoFinal-AllWhiteVersion-NoBG-color-not-ideal2.png"],
];

const portfolioSites = [
  ["stanford-uit", "https://uit.stanford.edu/"],
  ["sunlight-giving", "https://sunlightgiving.org/"],
  ["wildcard-giving", "https://wildcardgiving.org/"],
  ["byu", "https://www.byu.edu/"],
  ["z1-consultant", "https://z1consultant.com/"],
  ["rbb-marketing", "https://rbbmarketing.com/"],
  ["giving-stanford", "https://giving.stanford.edu/"],
  ["stanford-earth", "https://earth.stanford.edu/"],
  ["good-gravy-films", "https://goodgravyfilms.org/"],
  ["client-center-360", "https://clientcenter360.com/"],
  ["speech-cloud", "https://speechcloud.com/"],
  ["family-wholeness", "https://familywholeness.org/"],
  ["hiscox", "https://www.hiscox.com/"],
  ["boise-discovery", "https://boisediscovery.com/"],
  ["imagine-learning", "https://www.imaginelearning.com/"],
];

await mkdir(root, { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 960 },
  deviceScaleFactor: 1,
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131 Safari/537.36",
});

for (const [relativePath, url] of siteImages) {
  const destination = path.join(root, relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  const response = await context.request.get(url, { timeout: 60000 });
  if (!response.ok()) {
    process.stdout.write(`Asset failed (${response.status()}): ${url}\n`);
    continue;
  }
  await writeFile(destination, await response.body());
  process.stdout.write(`Saved ${relativePath}\n`);
}

const page = await context.newPage();
if (!process.argv.includes("--images-only")) for (const [slug, url] of portfolioSites) {
  const destination = path.join(root, "portfolio", `${slug}.jpg`);
  await mkdir(path.dirname(destination), { recursive: true });
  try {
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(3500);
    await page.evaluate(async () => {
      window.scrollTo(0, Math.min(document.documentElement.scrollHeight, 1800));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.scrollTo(0, 0);
      document.querySelectorAll('[class*="cookie" i], [id*="cookie" i], [class*="consent" i], [id*="consent" i]').forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (getComputedStyle(element).position === "fixed" && rect.width > innerWidth * 0.5) element.remove();
      });
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: destination, type: "jpeg", quality: 88 });
    process.stdout.write(`Captured ${slug} (${response?.status() ?? "unknown"})\n`);
  } catch (error) {
    process.stdout.write(`Capture failed for ${slug}: ${error instanceof Error ? error.message : String(error)}\n`);
  }
}

await browser.close();
