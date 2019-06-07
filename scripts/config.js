const fs = require("fs");
const path = require("path");
const glob = require("glob");

// icon data (JSON)
const iconData = require("../icons/icons.json");

// paths
const sourcePath = path.join(__dirname, `../icons/`);
const readmePath = path.join(__dirname, `/util/readme.txt`);
const licensePath = path.join(__dirname, `../license.txt`);

// arrays
const svgArray = glob.sync(sourcePath + "**/*.svg", {});
const aiArray = glob.sync(sourcePath + "**/*.ai", {});
const pngArray = glob.sync(sourcePath + "**/*.png", {});
const iconArray = Object.keys(iconData);

// dependency configs
const pngConfig = { height: "1400", width: "1400" };

module.exports = {
    iconData,
    sourcePath,
    readmePath,
    licensePath,
    svgArray,
    aiArray,
    pngArray,
    iconArray,
    pngConfig
};
