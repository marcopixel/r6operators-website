import path from "node:path"
import archiver from "archiver"
import fs from "fs-extra"
import pkg from "r6operators/package.json"
import { ICONS_DIR, LICENSE_FILE, PUBLIC_DIR, README_FILE } from "../config"

export default async function generatePackage(): Promise<void> {
  // inform user that script has started
  console.log("Generate package zip file...\n")

  // set timer
  const startTimer = process.hrtime()

  // set output path
  const filename = `r6operators-icons-${pkg.version}.zip`
  const iconsPath = ICONS_DIR
  const outputFile = path.resolve(PUBLIC_DIR, `./${filename}`)

  // check if folder exists and create if not
  fs.ensureDir(path.dirname(outputFile)).catch((error) => {
    throw error
  })

  // init archiver
  const output = fs.createWriteStream(outputFile)
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  })

  // catch errors
  output.on("error", (error) => {
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
  archive.directory(path.resolve(iconsPath, "./png"), "High-resolution PNG")
  archive.directory(path.resolve(iconsPath, "./svg"), "Scalable vector graphic (SVG)")
  archive.file(README_FILE, { name: `readme.txt` })
  archive.file(LICENSE_FILE, { name: `license.txt` })

  // finalize it and save it
  await archive.finalize()

  console.info("\nFinished!")
  console.info(`Execution time: ${process.hrtime(startTimer)[0]} seconds`)
  console.log(`Output folder: ${outputFile}\n`)

  return archive
}
