# 📈 TradingView Strategy Automation

This project automates the testing of Pine Script strategies on [TradingView](https://www.tradingview.com/) using [Playwright](https://playwright.dev/).  
It supports running tests both locally and on CI (GitHub Actions), with a manual step to handle CAPTCHA-based authentication.

---

## ⚙️ Features

- ✅ Automates login and strategy injection into TradingView chart.
- 🧪 Runs strategy tests using Playwright.
- 💾 Saves session state to avoid repeated logins.
- ☁️ GitHub Actions CI integration (non-authenticated mode).

---

## 🚀 Getting Started

Follow these steps to set up and run the TradingView strategy automation project:

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/tv-strategy-tester.git
cd tv-strategy-tester
```

### 2. Install Dependencies

Install all required packages:

```bash
npm install
npx playwright install
```

### 3. Authenticate with TradingView

Run the following command to launch a browser and manually log in to TradingView (handle CAPTCHA). Once redirected to the homepage, the session will be saved automatically and the browser will close.

```bash
npm run auth
```

> This will save your session credentials to `auth.json` for future test runs.

### 4. Run All Strategy Tests Locally

Run the full test suite in headless mode:

```bash
npm run test
```

Or run the tests with the Playwright UI for debugging:

```bash
npm run test:ui
```

### 5. Review Test Results

After the test run:

- Screenshots for each strategy scenario will be saved to the `screenshots/` directory, grouped in subfolders by strategy name.
- A Playwright report will be generated and available via CI artifacts or in the `playwright-report/` folder locally (if configured).

---

## 🧪 Run on CI (GitHub Actions)

CI runs headless and saves playwright report and screenshots to artifacts
