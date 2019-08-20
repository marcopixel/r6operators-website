import ora from "ora";
import chalk from "chalk";

import * as config from "./config";
import generatePACKAGE from "./modules/generatePACKAGE";

export function processPACKAGE(array) {
    // spinner
    const text = `Generating full package ZIP`;
    const spinner = ora(text).start();

    // counter vars
    const inputCount = array.length;
    let outputCount = 0;

    // exit if array is empty
    if (!Array.isArray(array) || !array.length) {
        spinner.text = `${chalk.red(text)} - icons.json not found or corrupt!`;
        spinner.fail();
        process.exit(0);
    }

    const result = new Promise((resolve, reject) => {
        generatePACKAGE(array, config.sourcePath, config.destPath)
            .then(
                // success
                () => {
                    outputCount++;
                    // prettier-ignore
                    spinner.text = text + ` - ${outputCount}/${inputCount} - `;
                    resolve();
                },
                // error
                rej => {
                    outputCount++;
                    // prettier-ignore
                    spinner.text = `${chalk.red(text)} - Failed to create package!`;
                    reject(rej);
                }
            )
            // catch any unwanted errors
            .catch(err => {
                reject(err);
            });
    });

    // wait for promise to finish
    result
        .then(
            // success
            () => {
                // prettier-ignore
                spinner.text = `${chalk.green(text)} - Package succesfully created!`;
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
processPACKAGE(config.iconArray);
