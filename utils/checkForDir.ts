import * as fs from "fs";

export function checkForDir(strategyDir: string) {
  if (!fs.existsSync(strategyDir)) {
    fs.mkdirSync(strategyDir, { recursive: true });
  }
}
