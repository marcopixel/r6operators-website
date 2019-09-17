/* eslint-disable unicorn/filename-case */
import ora from "ora";
import chalk from "chalk";

import * as config from "./config";
import generatePackage from "./modules/generatePackage";

// generate PNG files
export default async function generateFullPackage(array) {
    return new Promise((resolve, reject) => {
        // spinner
        const text = chalk.bold("Generating full package ZIP");
        const spinner = ora({ text }).start();

        // exit if array is empty/corrupt
        if (!Array.isArray(array) || array.length === 0) {
            spinner.text = `${chalk.red("ERROR")} - icons.json not found or corrupt!`;
            spinner.fail();
            throw new Error("icons.json not found or corrupt!");
        }
        // eslint-disable-next-line promise/param-names
        generatePackage(array, config.sourcePath, config.destinationPath)
            .then(
                onfulfilled => {
                    spinner.text = `${chalk.green(text)} - Package succesfully created!`;
                    spinner.succeed();
                    return resolve(onfulfilled);
                },
                onrejected => {
                    spinner.text = `${chalk.red(text)} - Failed to create package!`;
                    spinner.fail();
                    throw new Error(onrejected.error);
                }
            )
            .catch(error => {
                reject(error);
            });
    });
}

// generate full package
generateFullPackage(config.iconArray)
    // catch any errors
    .catch(error => {
        console.error(error);
    });
