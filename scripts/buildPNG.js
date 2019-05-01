const fs = require("fs");
const chalk = require('chalk');
const svg_to_png = require("svg-to-png");

const config = require("./config.js");
const testSource = require("./util/testSource.js");

async function processSVG(array, src, dest, options) {

    // set counter vars
    const inputCount = array.length;
    let outputCount = 0

    // inform the user that the process started
    console.log(`${chalk.blue('info')} Starting ${chalk.bold('SVG to PNG')} conversion...`)

    // map the icon array and convert each icon independently
    var result = array.map(async item => {
        return await new Promise((resolve, reject) => {
            svg_to_png.convert(src + "/" + item + ".svg", dest, options)
                // success
                .then(res => {
                    outputCount++;
                    console.log(`${chalk.blue('info')} ${chalk.bold(outputCount)}/${chalk.bold(inputCount)} - ${item}.png finished!`)
                    resolve(item);
                },
                    // error
                    rej => {
                        outputCount++;
                        console.log(`${"\n"}${chalk.red('error')} ${chalk.bold(outputCount)}/${chalk.bold(inputCount)} - ${item}.png failed!`)
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
            console.log(`${chalk.green('success')} Output location: ${chalk.bold(dest)}`)
        },
            // output for failure
            rej => {
                console.log(`${chalk.red('error')} Build script aborted, check the terminal for more information!`)
                console.log(rej);
                process.exit(1);
            })
        // catch any unwanted errors
        .catch(err => {
            console.log(err);
        });
}

// check source files
testSource(true, false, false).then(
    res => { processSVG(config.iconArray, config.svgPath, config.pngDestPath, config.pngConfig); }, rej => {
        console.error(`${chalk.red('error')} Source checks failed, aborting...`);
        return;
    })
    .catch(err => {
        console.error(`${chalk.red('error')} Source checks failed, aborting...`);
        console.error(err);
        return;
    })