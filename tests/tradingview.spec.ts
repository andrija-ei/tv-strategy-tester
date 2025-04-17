import { test, Page, chromium } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { strategyConfigs } from "../src/config/strategyConfig";
import { generateStrategyCode } from "../utils/generateStrategy";
import { StrategyConfig } from "../src/types";

const strategyTemplate = fs.readFileSync(
  path.join(__dirname, "../src/templates/strategy.template.txt"),
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

async function testStrategy(page: Page, name: string, config: StrategyConfig) {
  await page.getByRole("button", { name: "Pine Editor" }).click();
  await page.getByText("@version=").click();
  await page.keyboard.press("Control+A");

  const strategyCode = generateStrategyCode(strategyTemplate, config);

  await page.evaluate(async (text) => {
    await navigator.clipboard.writeText(text);
  }, strategyCode);

  await page.getByText("@version=").click({ button: "right" });

  await page.waitForTimeout(500);
  for (let i = 0; i < 8; i++) await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Enter");

  const strategyDir = path.join("screenshots", name);
  if (!fs.existsSync(strategyDir)) {
    fs.mkdirSync(strategyDir, { recursive: true });
  }

  await page.waitForTimeout(2000);
  await page
    .locator("#bottom-area")
    .screenshot({ path: path.join(strategyDir, "strategy-code.png") });

  await page.getByText("Add to chart").click();
  await page.waitForTimeout(2000);

  await page
    .locator(".chart-container")
    .screenshot({ path: path.join(strategyDir, "strategy-chart.png") });

  await page
    .locator("#bottom-area")
    .screenshot({ path: path.join(strategyDir, "strategy-test-overview.png") });

  console.log(`✅ ${name} strategy applied to chart`);
}

test.describe("Automation tests strategy script", () => {
  for (const config of strategyConfigs) {
    test(`Run strategy: ${config.name}`, async () => {
      const browser = await chromium.launch({ headless: true });
      const context = await browser.newContext({ storageState: "./auth.json" });
      const page = await context.newPage();

      await checkForAuth();
      await navigateToChart(page);
      await removeStrategy(page);
      await testStrategy(page, config.name, config);
    });
  }
});
