const fs = require("fs");
const path = require("path");
const chalk = require('chalk');
const svg_to_png = require("svg-to-png");

const srcPath = path.join(__dirname, `../static/icons/svg/`);
const destPath = path.join(__dirname, `../static/icons/png/`);
const config = { defaultHeight: "1400px", defaultWidth: "1400px" }


// check if source folder exists
if (!fs.existsSync(srcPath)) {
    console.error(`${chalk.red('error')} Source folder doesn't exist. Path: ${srcPath}`);
    return;
}
// check if destination path exists and create it if needed
if (!fs.existsSync(destPath)) {
    console.warn(`${chalk.yellow('warn')} Output folder doesn't exist, creating...`);
    fs.mkdirSync(destPath, { recursive: true });
}
// filter out non-svg files based on string name (really basic, do not recommend)
const iconArray = fs.readdirSync(srcPath)
    .filter(i => i.split('.').pop() === "svg");

// check if any SVG files are left after filtering
if (iconArray.length === 0) {
    console.error(`${chalk.red('error')} No SVG files exist at source location.`)
    return;
}

async function processSVG(array, src, dest, options) {

    // set counter vars
    const inputCount = array.length;
    let outputCount = 0

    // inform the user that the process started
    console.log(`${chalk.blue('info')} Starting ${chalk.bold('SVG to PNG')} conversion...`)

    // map the icon array and convert each icon independently
    var result = array.map(async item => {
        return await new Promise((resolve, reject) => {
            svg_to_png.convert(src + "/" + item, dest, options)
                // success
                .then(res => {
                    outputCount++;
                    console.log(`${chalk.blue('info')} ${chalk.bold(outputCount)}/${chalk.bold(inputCount)} - ${item} finished!`)
                    resolve(item);
                },
                    // error
                    rej => {
                        outputCount++;
                        console.log(`${"\n"}${chalk.red('error')} ${chalk.bold(outputCount)}/${chalk.bold(inputCount)} - ${item} failed!`)
                        reject(item);
                    })
                // catch any unwanted errors
                .catch(err => {
                    reject(err);
                })
        });
    });

    // wait for all promises to finish
    Promise.all(result)
        // output for success
        .then(res => {
            console.log(`${chalk.green('success')} ${outputCount}/${inputCount} items successfully converted!`)
            console.log(`${chalk.green('success')} Output location: ${chalk.bold(destPath)}`)
        },
            // output for failure
            rej => {
                console.log(`${chalk.red('error')} Build script aborted, check the terminal for more information!`)
                process.exit(1);
            })
        // catch any unwanted errors
        .catch(err => {
            console.log(err);
        });
}
// execute the function
processSVG(iconArray, srcPath, destPath, config);