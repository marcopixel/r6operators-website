import { promises as fs } from "node:fs"
import { ICONS_DIR, PUBLIC_DIR, DIST_DIR } from "./config"

async function main(): Promise<void> {
  // remove all zip files inside public folder
  const files = await fs.readdir(PUBLIC_DIR)
  const zipFiles = files.filter((file) => file.endsWith(".zip"))
  await Promise.all(zipFiles?.map((file) => fs.rm(`${PUBLIC_DIR}/${file}`)))
  await fs.rm(ICONS_DIR, { recursive: true, force: true })
  await fs.rm(DIST_DIR, { recursive: true, force: true })
  console.log("Cleanup finished!")
}

try {
  await main()
} catch (error) {
  console.log(error)
  process.exit(1)
}
