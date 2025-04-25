import { test, Page, chromium } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { checkForAuth } from "../utils";
import { StrategyConfig } from "../src/types";
import { strategyConfig } from "../src/config/strategyConfig";

const strategy = fs.readFileSync(
  path.join(__dirname, "../src/base/strategy.txt"),
  "utf8"
);

const CHART_URL = "https://www.tradingview.com/chart/";

async function removeStrategy(page: Page) {
  await page.getByRole("button", { name: "Remove Objects" }).click();
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Enter");
}

async function navigateToChart(page: Page) {
  await page.goto(CHART_URL);
  await page.waitForSelector(".chart-container");
}

async function addStrategy(page: Page, name: string) {
  await page.getByRole("button", { name: "Pine Editor" }).click();
  await page.getByText("@version=").click();
  await page.keyboard.press("Control+A");

  await page.evaluate(async (text) => {
    await navigator.clipboard.writeText(text);
  }, strategy);

  await page.getByText("@version=").click({ button: "right" });

  await page.waitForTimeout(500);
  for (let i = 0; i < 8; i++) await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Enter");

  await page.getByText("Add to chart").click();
  await page.waitForTimeout(2000);

  console.log(`✅ ${name} strategy applied to chart`);
}

async function changeStrategyConfig(
  page: Page,
  config: StrategyConfig,
  strategyDir: string
) {
  await page
    .getByRole("button", { name: "Automation tests strategy script report" })
    .click();
  await page.getByText("Settings…").click();
  await page.waitForTimeout(2000);

  await page.getByRole("button", { name: "close", exact: true }).click();
  await page.waitForTimeout(1000);

  await page.getByRole("option", { name: config.price_source }).click();
  await page.waitForTimeout(1000);

  await page
    .locator(".dialog-qyCw0PaN ")
    .screenshot({ path: path.join(strategyDir, "input-setup.png") });

  await page.getByRole("button", { name: "Ok" }).click();
}

async function testStrategy(page: Page, strategyDir: string) {
  await page
    .locator("#bottom-area")
    .screenshot({ path: path.join(strategyDir, "test-overview.png") });
}

test.describe("Automation tests strategy script", () => {
  checkForAuth();
  for (const config of strategyConfig) {
    test(`Run strategy: ${config.name}`, async () => {
      const browser = await chromium.launch({ headless: true });
      const context = await browser.newContext({ storageState: "./auth.json" });
      const page = await context.newPage();
      const strategyDir = path.join("screenshots", config.name);

      if (!fs.existsSync(strategyDir)) {
        fs.mkdirSync(strategyDir, { recursive: true });
      }

      await navigateToChart(page);
      await removeStrategy(page);
      await addStrategy(page, config.trigger);
      await changeStrategyConfig(page, config, strategyDir);
      await testStrategy(page, strategyDir);
    });
  }
});
