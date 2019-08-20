import * as path from "path";
import ora from "ora";
import chalk from "chalk";

import generateZIP from "./modules/generateZIP";

import * as config from "./config";

export function processZIP(array) {
    // counter vars
    const inputCount = array.length;
    let outputCount = 0;

    // spinner
    const text = `Building ZIP files`;
    const spinner = ora(text).start();

    // exit if array is empty
    if (!Array.isArray(array) || !array.length) {
        spinner.text = `${chalk.red(text)} - icons.json not found or corrupt!`;
        spinner.fail();
        process.exit(0);
    }

    // map the icon array and convert each icon
    const result = array.map(async item => {
        const itemPath = path.join(config.sourcePath + path.sep + item + path.sep);
        return await new Promise((resolve, reject) => {
            generateZIP(item, itemPath)
                .then(
                    // success
                    () => {
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
            () => {
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
