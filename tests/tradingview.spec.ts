import { test, Page, chromium } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

const strategyScript = fs.readFileSync(
  path.join(__dirname, "../src/strategy.txt"),
  "utf8"
);

const CHART_URL = "https://www.tradingview.com/chart/";

async function checkForAuth() {
  if (!fs.existsSync("auth.json")) {
    throw new Error(
      "Missing auth.json. Please run `save-auth.ts` locally and commit the file."
    );
  }
}

async function removeStrategy(page: Page) {
  await page.getByRole("button", { name: "Remove Objects" }).click();
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Enter");
}

async function navigateToChart(page: Page) {
  await page.goto(CHART_URL);
  await page.waitForSelector(".chart-container");
}

async function testStrategy(page: Page) {
  //   await page
  //     .getByRole("button", { name: "Strategy Tester" })
  //     .click({ force: true });
  //   await page.waitForTimeout(2000);
  await page
    .locator("#bottom-area")
    .screenshot({ path: "screenshots/strategy-result.png" });
}

async function addStrategy(page: Page) {
  await page.getByText("@version=").click();
  await page.keyboard.press("Control+A");

  await page.evaluate(async (text) => {
    await navigator.clipboard.writeText(text);
  }, strategyScript);

  await page.getByText("@version=").click({ button: "right" });
  await page.evaluate(async (text) => {
    await navigator.clipboard.writeText(text);
  }, strategyScript);

  await page.waitForTimeout(500);
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Enter");

  await page
    .locator("#bottom-area")
    .screenshot({ path: "screenshots/strategy-code.png" });

  await page.getByText("Add to chart").click();
  await page.waitForTimeout(2000);
  console.log("✅ Strategy applied to chart");
}

test.describe("TradingView Strategy Tests", () => {
  test("Test Strategy with Auth Session", async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ storageState: "./auth.json" });
    const page = await context.newPage();

    await checkForAuth();
    await navigateToChart(page);
    await removeStrategy(page);
    await addStrategy(page);
    await testStrategy(page);

    // await browser.close();
  });
});
