/* eslint-disable unicorn/no-process-exit */
// @ts-nocheck
import * as fs from "fs-extra";
import path from "path";
import ops from "r6operators";

const OUTPUT_DIR = path.resolve(__dirname, "../static/");
const INPUT_DIR = path.resolve(__dirname, "../node_modules/r6operators/lib/icons");

import generateZip from "./modules/generateZip";
import generatePackage from "./modules/generatePackage";

async function main(): Promise<void> {
  // inform user that the script has started
  console.log("Copying assets to static folder...");

  // check if folder exists and create if not
  await fs.ensureDir(OUTPUT_DIR).catch(error => {
    throw error;
  });

  // copy svg & png icons from module
  await fs.copySync(INPUT_DIR, path.resolve(OUTPUT_DIR, "./icons"));

  // generate zip files
  await generateZip(ops);
  await generatePackage();
}

main().catch(error => {
  console.log(error);
  process.exit(1);
});
