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

### Install dependencies

```bash
npm install
npx playwright install
```

### Authenticate once (manually)

```bash
npm run auth
```

> You’ll have 60 seconds to log in and solve CAPTCHA.
> Once logged in, your session will be saved to auth.json.

### Run the test locally

```bash
npm run test
```

Or with ui:

```bash
npm run test:ui
```

---

## 🧪 Run on CI (GitHub Actions)

CI runs headless and saves playwright report and screenshots to artifacts
