import * as fs from "fs";

export async function checkForAuth() {
  if (!fs.existsSync("auth.json")) {
    throw new Error(
      "Missing auth.json. Please run `save-auth.ts` locally and commit the file."
    );
  }
}
