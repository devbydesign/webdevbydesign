import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto(process.argv[2] || "https://webdevbydesign.com/", { waitUntil: "networkidle", timeout: 60000 });
const result = await page.evaluate(() => ({
  mainText: (document.querySelector("main") || document.body).innerText,
  lists: [...document.querySelectorAll("main ul, main ol")].map((list) => ({
    ordered: list instanceof HTMLOListElement,
    items: [...list.querySelectorAll(":scope > li")].map((item) => item.innerText.trim()),
  })),
}));
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
await browser.close();
