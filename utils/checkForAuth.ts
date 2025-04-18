import * as fs from "fs";

export function checkForAuth() {
  if (!fs.existsSync("auth.json")) {
    throw new Error(
      "Missing auth.json. Please run `save-auth.ts` locally and commit the file."
    );
  }
}
