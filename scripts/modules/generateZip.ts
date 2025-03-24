import path from "node:path"
import archiver from "archiver"
import fs from "fs-extra"

import { ICONS_DIR, README_FILE, LICENSE_FILE } from "../config"

export default async function generatePng(iconObject: Record<string, unknown>): Promise<void> {
  // inform user that script has started
  console.log("Generate ZIP files...\n")

  // set counter vars + timer
  const inputCount = Object.keys(iconObject).length
  let outputCount = 0
  const startTimer = process.hrtime()

  // set output path
  const iconsPath = ICONS_DIR
  const outputPath = path.resolve(iconsPath, "./zip/")

  // map the icon object
  const result = Object.keys(iconObject).map(async (op) => {
    // check if folder exists and create if not
    fs.ensureDir(outputPath).catch((error) => {
      throw error
    })

    // init archiver
    const output = fs.createWriteStream(outputPath + `/${op}.zip`)
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level.
    })

    // catch errors
    output.on("error", (error: NodeJS.ErrnoException) => {
      const error_ = error.code === "ENOENT" ? error : error;
      throw error_;
    })

    // resolve on finish
    output.on("finish", () => {
      return output
    })

    // catch warnings (ie stat failures and other non-blocking errors)
    archive.on("warning", (error) => {
      throw error
    })

    // pipe archive data to the file
    archive.pipe(output)

    // add files to zip
    archive.append(fs.createReadStream(`${iconsPath}/svg/${op}.svg`), {
      name: `${op}.svg`,
    })
    archive.append(fs.createReadStream(`${iconsPath}/png/${op}.png`), {
      name: `${op}.png`,
    })
    archive.file(README_FILE, { name: `readme.txt` })
    archive.file(LICENSE_FILE, { name: `license.txt` })

    // finalize it and save it
    archive.finalize()

    // increase counter when finished and output it to the console
    outputCount += 1
    console.log(`${outputCount}/${inputCount} - ${path.normalize(`${outputPath}/${op}.zip`)}`)

    // return operator name to promise
    return op
  })

  // wait for all promises to finish
  await Promise.all(result)
    .then((resolved) => {
      console.info("\nFinished!")
      console.info(`Execution time: ${process.hrtime(startTimer)[0]} seconds`)
      console.log(`Output folder: ${iconsPath}\n`)
      return resolved
    })
    .catch((error) => {
      throw error
    })
}
