/* eslint-disable unicorn/filename-case */
import ora from "ora";
import chalk from "chalk";
import path from "path";

import * as config from "./config";
import generateZIP from "./modules/generateZIP";

// generate PNG files
export default async function generateZIPFiles(array) {
    return new Promise((resolve, reject) => {
        // spinner
        const text = chalk.bold("Building ZIP files");
        const spinner = ora({ text }).start();

        // counter vars
        const inputCount = array.length;
        let outputCount = 0;

        // exit if array is empty/corrupt
        if (!Array.isArray(array) || array.length === 0) {
            spinner.text = `${chalk.red("ERROR")} - icons.json not found or corrupt!`;
            spinner.fail();
            throw new Error("icons.json not found or corrupt!");
        }

        // map the icon array and apply to each icon
        const result = array.map(async item => {
            const itemFolder = path.normalize(`${config.sourcePath}${path.sep}${item}`);
            // eslint-disable-next-line promise/param-names
            return new Promise((_resolve, _reject) => {
                generateZIP(path.normalize(itemFolder))
                    .then(
                        onfulfilled => {
                            outputCount += 1;
                            // prettier-ignore
                            spinner.text = `${chalk.yellow(text)} - ${outputCount}/${inputCount} - ${item}`;
                            return _resolve(onfulfilled);
                        },
                        onrejected => {
                            const status = {
                                error: onrejected,
                                item
                            };
                            return _reject(status);
                        }
                    )
                    .catch(error => {
                        reject(error);
                    });
            });
        });

        // wait for all promises to finish
        Promise.all(result)
            .then(
                success => {
                    spinner.text = `${chalk.green(text)} - ${outputCount}/${inputCount} items successfully packaged!`;
                    spinner.succeed();
                    return resolve(success);
                },
                fail => {
                    // prettier-ignore
                    spinner.text = `${chalk.red(text)} - ${outputCount}/${inputCount} - ${fail.item} - Failed to package!`;
                    spinner.fail();
                    throw new Error(fail.error);
                }
            )
            .catch(error => {
                console.error(error);
            });
    });
}

// generate zip files
generateZIPFiles(config.iconArray)
    // catch any errors
    .catch(error => {
        console.error(error);
    });
