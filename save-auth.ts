//  Opens a browser with Playwright
//  Lets you log in manually
// 	Waits 60 seconds
// 	Saves your session to auth.json (including cookies, tokens, etc.)

import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.tradingview.com/accounts/signin/");

  console.log("➡️ Please manually log in within the browser (handle captcha).");
  console.log("🕒 You have 60 seconds...");

  await page.waitForTimeout(60000);
  // Save auth config to json
  await context.storageState({ path: "auth.json" });

  console.log("✅ Auth session saved to auth.json");

  await browser.close();
})();
