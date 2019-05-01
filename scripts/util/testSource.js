const path = require("path");
const chalk = require('chalk');
const config = require("../config.js");

function testArrays(arr1, arr2, type) {
    return new Promise((resolve, reject) => {
        // check if array lenght match
        var checkLenght = new Promise((resolve, reject) => {
            if (arr1.length === 0 || arr2.length === 0) {
                reject(new Error(`${type} One of the arrays are empty, check if you already have all files generated.  Array1 - ${arr1.length} | Array2 - ${arr2.length} `));
                return;
            } else if (arr1.length !== arr2.length) {
                reject(new Error(`${type} Arrays do not have the same lenght.  Array1 - ${arr1.length} | Array2 - ${arr2.length} `));
                return;
            } else {
                resolve();
            }
        });

        // then check if contents are the same (excluding file extensions)
        var checkMatch = arr1.map(async item => {
            return await new Promise((resolve, reject) => {
                if (!arr2.includes(path.parse(item).name)) {
                    // throw error if mismatch
                    reject(new Error(`${type} Array items do not match. File: ${item}`));
                } else {
                    // else continue
                    resolve();
                }
            });
        });

        // wait for all promises to finish
        Promise.all(checkMatch.concat(checkLenght))
            .then(res => {
                console.log(`${chalk.blue('info')} ${type} Check OK!`)
                resolve(res)
            }, rej => {
                console.error(`${chalk.red('error')} ${type} Check Failed!`)
                reject(rej);
            })
            .catch(err => {
                console.error(`${chalk.red('error')} ${type} Check Failed!`)
                reject(err);
            })
    });
}

module.exports = function testSourceFiles(svg, png, ai) {
    return new Promise((resolve, reject) => {
    console.log(`${chalk.blue('info')} Checking icon source files...`)

    // set empty array to add the required tests
    var array = [];

    // independent test are added here to the array
    if (svg === true ) {
        const SVGTest = testArrays(config.svgArray, config.iconArray, "SVG")
        array.push(SVGTest);
    }
    if (png === true ) {
        const PNGTest = testArrays(config.pngArray, config.iconArray, "PNG")
        array.push(PNGTest);
    }
    if (ai === true ) {
        const AITest = testArrays(config.aiArray, config.iconArray, "AI")
        array.push(AITest);
    }

    // then tested here
    Promise.all(array)
        .then(res => {
            console.error(`${chalk.green('success')} All checks finished successfully, continuing...`)
            resolve(res);
        },
            rej => {
                console.error(`${chalk.red('error')} Source file checks failed!`)
                console.error(rej.stack);
                reject(rej);
            })
        .catch(err => {
            console.error(`${chalk.red('error')} Source file checks aborted!`)
            console.log(err);
            reject(err);
        })
    })
}
