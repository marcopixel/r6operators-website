import * as path from "path";
import * as glob from "glob";

// icon data (JSON)
import iconData from "../icons/icons.json";

// paths
const sourcePath = path.join(__dirname, `../icons/`);
const destPath = path.join(__dirname, `../dist/`);
const readmePath = path.join(__dirname, `/util/readme.txt`);
const licensePath = path.join(__dirname, `../license.txt`);

// arrays
const svgArray = glob.sync(sourcePath + "**/*.svg", {});
const aiArray = glob.sync(sourcePath + "**/*.ai", {});
const pngArray = glob.sync(sourcePath + "**/*.png", {});
const iconArray = Object.keys(iconData);

// dependency configs
const pngConfig = { height: 1400, width: 1400 };
const svgoConfig = {
    plugins: [
        {
            removeViewBox: true
        },
        {
            convertPathData: false
        },
        {
            removeRasterImages: false
        }
    ]
};

export {
    iconData,
    sourcePath,
    destPath,
    readmePath,
    licensePath,
    svgArray,
    aiArray,
    pngArray,
    iconArray,
    pngConfig,
    svgoConfig
};
