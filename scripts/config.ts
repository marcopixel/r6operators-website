import url from "node:url"
import path from "node:path"
import { createRequire } from 'node:module';

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url);

const PUBLIC_DIR = path.resolve(__dirname, "../public/")
const ICONS_DIR = path.resolve(PUBLIC_DIR, "./icons/")
const INPUT_DIR = path.resolve(__dirname, "../node_modules/r6operators/dist/icons")
const DIST_DIR = path.resolve(__dirname, "../dist")

const README_FILE = path.resolve(__dirname, "./util/readme.txt")
const LICENSE_FILE = path.resolve(require.resolve("r6operators/LICENSE"));
const PNG_CONFIG = {
  dpi: 400, // dpi
  height: 1500, // height in px
  width: 1500, // width in px
}

export { __filename, __dirname, PUBLIC_DIR, ICONS_DIR, INPUT_DIR, DIST_DIR, README_FILE, LICENSE_FILE, PNG_CONFIG }
