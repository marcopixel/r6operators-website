const fs = require("fs");
const path = require("path");
const glob = require("glob");

// icon data (JSON)
const iconData = require("../icons/icons.json");

// paths
const sourcePath = path.join(__dirname, `../icons/`);

// arrays
const svgArray = glob.sync(sourcePath + "**/*.svg", {});
const aiArray = glob.sync(sourcePath + "**/*.ai", {});
const pngArray = glob.sync(sourcePath + "**/*.png", {});

// dependency configs
const pngConfig = { height: "1400", width: "1400" };

module.exports = {
    pngConfig,
    sourcePath,
    iconData,
    svgArray,
    aiArray,
    pngArray
};
