const path = require("path");
const ora = require("ora");
const chalk = require("chalk");

const generateZIP = require("./modules/generateZIP.js");

const config = require("./config.js");

async function processZIP(array) {
    // counter vars
    const inputCount = array.length;
    let outputCount = 0;

    // spinner
    let text = `Building ZIP files`;
    const spinner = ora(text).start();

    // exit if array is empty
    if (!Array.isArray(array) || !array.length) {
        spinner.text = `${chalk.red(text)} - No files found to convert!`;
        spinner.fail();
        process.exit(0);
    }

    // map the icon array and convert each icon
    var result = array.map(async item => {
        const itemPath = path.join(config.sourcePath + path.sep + item + path.sep);
        return await new Promise((resolve, reject) => {
            generateZIP(item, itemPath)
                .then(
                    // success
                    res => {
                        outputCount++;
                        // prettier-ignore
                        spinner.text = text + ` - ${outputCount}/${inputCount} - ${item}`;
                        resolve(item);
                    },
                    // error
                    rej => {
                        outputCount++;
                        // prettier-ignore
                        spinner.text = `${chalk.red(text)} - ${outputCount}/${inputCount} - ${item} - Failed to convert!`;
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
processZIP(config.iconArray);

module.exports = processZIP;
