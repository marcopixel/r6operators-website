const fs = require("fs");
const path = require("path");
var svg_to_png = require("svg-to-png");

const srcPath = path.join(__dirname, `../icons/`);
const destPath = path.join(__dirname, `../static/icons/png/`);
const config = { defaultHeight: "1400px", defaultWidth: "1400px" }


// check if source folder exists
if (!fs.existsSync(srcPath)) {
    console.error("ERROR: Source folder doesn't exist!");
    return;
}
// check if destination path exists and create it if needed
if (!fs.existsSync(destPath)) {
    console.warn("WARN: Output folder doesn't exist, creating...");
    fs.mkdirSync(destPath, { recursive: true });
}
// filter out non-svg files based on string name (really basic, do not recommend)
const iconArray = fs.readdirSync(srcPath)
                    .filter(i => i.split('.').pop() === "svg");

// check if any SVG files are left after filtering
if (iconArray.length === 0) {
    console.error("ERROR: No SVG files found!")
    return;
}

// create the actual function of converting the svgs
async function processSVG(array, src, dest, options) {

    // set counter vars
    const inputCount = array.length;
    var outputCount = 0;

    // convert each icon independendly and increase the counter
    for (const item of array) {
        await svg_to_png.convert(src + "/" + item, dest, options);
        outputCount++;
        console.log(`INFO: ${outputCount}/${inputCount} - ${item} finished!`)
    }

    console.log(`INFO: ${outputCount}/${inputCount} icons converted to PNG! You can find them under ${destPath}`)
}

// execute it
processSVG(iconArray, srcPath, destPath, config);