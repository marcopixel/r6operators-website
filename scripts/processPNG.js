const fs = require("fs");
const path = require("path");
const ora = require("ora");
const chalk = require("chalk");

const generatePNG = require("./modules/generatePNG.js");

const config = require("./config.js");

async function processPNG(array) {
    // counter vars
    const inputCount = array.length;
    let outputCount = 0;

    // spinner
    let text = `Building PNG files`;
    const spinner = ora(text).start();

    // map the icon array and convert each icon
    var result = array.map(async item => {
        const fileName = path.basename(item, path.extname(item));
        return await new Promise((resolve, reject) => {
            generatePNG(item, `${config.sourcePath}/${fileName}/`)
                .then(
                    // success
                    res => {
                        outputCount++;
                        spinner.text = text + ` - ${outputCount}/${inputCount}`;
                        resolve(item);
                    },
                    // error
                    rej => {
                        // prettier-ignore
                        spinner.text = `${chalk.red(text)} - ${outputCount}/${inputCount} ${fileName}${path.extname(item)} failed!`;
                        reject(rej);
                    }
                )
                // catch any unwanted errors
                .catch(err => {
                    reject(err);
                });
        });
    });

    // wait for all promises to finish
    Promise.all(result)
        .then(
            // success
            res => {
                // prettier-ignore
                spinner.text = `${chalk.green(text)} - ${outputCount}/${inputCount} items successfully converted!`;
                spinner.succeed();
            },
            // reject
            rej => {
                spinner.fail();
                console.log(rej.stack);
                process.exit(1);
            }
        )
        // catch unwanted errors
        .catch(err => {
            console.log(err);
        });
}

// execute it
processPNG(config.svgArray);

module.exports = processPNG;
