/* eslint-disable unicorn/filename-case */
import ora from "ora";
import chalk from "chalk";
import path from "path";

import * as config from "./config";
import generatePNG from "./modules/generatePNG";
import optimizeSVG from "./modules/optimizeSVG";

// optimize SVG files
export async function optimizeSVGFiles(array) {
    return new Promise((resolve, reject) => {
        // spinner
        const text = chalk.bold("Optimizing SVG files");
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
                optimizeSVG(path.normalize(`${itemFolder}/${item}.svg`))
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
                    spinner.text = `${chalk.green(text)} - ${outputCount}/${inputCount} items successfully optimized!`;
                    spinner.succeed();
                    return resolve(success);
                },
                fail => {
                    // prettier-ignore
                    spinner.text = `${chalk.red(text)} - ${outputCount}/${inputCount} - ${fail.item} - Failed to optimize!`;
                    spinner.fail();
                    throw new Error(fail.error);
                }
            )
            .catch(error => {
                console.error(error);
            });
    });
}

// generate PNG files
export async function generatePNGFiles(array) {
    return new Promise((resolve, reject) => {
        // spinner
        const text = chalk.bold("Generating PNG files from SVG");
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
                generatePNG(path.normalize(`${itemFolder}/${item}.svg`))
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
                    spinner.text = `${chalk.green(text)} - ${outputCount}/${inputCount} items successfully converted!`;
                    spinner.succeed();
                    return resolve(success);
                },
                fail => {
                    // prettier-ignore
                    spinner.text = `${chalk.red(text)} - ${outputCount}/${inputCount} - ${fail.item} - Failed to converted!`;
                    spinner.fail();
                    throw new Error(fail.error);
                }
            )
            .catch(error => {
                console.error(error);
            });
    });
}

// optimize svg files first
optimizeSVGFiles(config.iconArray)
    // then generate the png files
    .then(() => {
        return generatePNGFiles(config.iconArray);
    })
    // catch any errors
    .catch(error => {
        console.error(error);
    });
