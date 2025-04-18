import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.tradingview.com/accounts/signin/");
  console.log(
    "➡️ Please manually log in (handle CAPTCHA). Waiting for redirect..."
  );

  try {
    await page.waitForURL("https://www.tradingview.com/", { timeout: 120000 });

    await context.storageState({ path: "auth.json" });
    console.log("✅ Auth saved to auth.json — closing browser.");
    await browser.close();
  } catch (error) {
    console.error("❌ Login not detected in time.");
    await browser.close();
  }
})();
