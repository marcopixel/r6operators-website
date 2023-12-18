import fs from "fs-extra"
import path from "path"
import { default as ops } from "r6operators"
import { PUBLIC_DIR, INPUT_DIR } from "./config"

import generatePng from "./modules/generatePng"
import generateZip from "./modules/generateZip"
import generatePackage from "./modules/generatePackage"

async function main(): Promise<void> {
  // inform user that the script has started
  console.log("Copying assets to static folder...")

  // check if folder exists and create if not
  await fs.ensureDir(PUBLIC_DIR).catch((error) => {
    throw error
  })

  // copy svg & png icons from module
  await fs.copySync(INPUT_DIR, path.resolve(PUBLIC_DIR, "./icons/svg"))

  // generate zip files
  await generatePng(ops)
  await generateZip(ops)
  await generatePackage()
}

main().catch((error) => {
  console.log(error)
  process.exit(1)
})
