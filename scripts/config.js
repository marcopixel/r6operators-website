const fs = require("fs");
const path = require("path");

// source file paths
const svgPath = path.join(__dirname, `../static/icons/svg/`);
const pngPath = path.join(__dirname, `../static/icons/png/`);
const aiPath = path.join(__dirname, `../static/icons/ai/`);

// destination paths
const zipDestPath = path.join(__dirname, `../static/icons/zip/`);
const pngDestPath = path.join(__dirname, `../static/icons/png/`);
const packageDestPath = path.join(__dirname, `../static/`);

// source icon object (needed for source file check)
const iconData = require('../src/icons.json')

// png generation settings
const pngConfig = { defaultHeight: "1400px", defaultWidth: "1400px" }

// source arrays filtered
const svgArray = fs.readdirSync(svgPath).filter(i => path.extname(i) === ".svg");
const pngArray = fs.readdirSync(pngPath).filter(i => path.extname(i) === ".png");
const aiArray = fs.readdirSync(aiPath).filter(i => path.extname(i) === ".ai");
const iconArray = Object.keys(iconData);

module.exports = {
    svgPath,
    pngPath,
    aiPath,
    zipDestPath,
    pngDestPath,
    packageDestPath,
    iconData,
    pngConfig,
    svgArray,
    pngArray,
    aiArray,
    iconArray
}