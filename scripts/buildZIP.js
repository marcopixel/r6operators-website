const fs = require("fs");
const path = require("path");
const chalk = require('chalk');
const archiver = require('archiver');

const config = require("./config.js");
const testSource = require("./util/testSource.js");

function generateSingleZIP(fileName) {
    return new Promise((resolve, reject) => {

        //initialize archiver
        const output = fs.createWriteStream(config.zipDestPath + `${fileName}.zip`);
        const archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });

        // catch errors
        output.on('error', error => {
            if (error.code === 'ENOENT') {
                reject(error)
            } else {
                reject(error);
            }
        });

        // resolve on finish
        output.on('finish', () => {
            resolve(output);
        });

        // catch warnings (ie stat failures and other non-blocking errors)
        archive.on('warning', error => {
            reject(error);
        });


        // pipe archive data to the file
        archive.pipe(output);

        // add files to zip
        archive.append(fs.createReadStream(`${config.svgPath}/${fileName}.svg`), { name: `${fileName}.svg` });
        archive.append(fs.createReadStream(`${config.pngPath}/${fileName}.png`), { name: `${fileName}.png` });
        archive.append(fs.createReadStream(`${config.aiPath}/${fileName}.ai`), { name: `${fileName}.ai` });
        archive.file(path.join(__dirname,`./util/readme.txt`), { name: `readme.txt` });
        archive.file(path.join(__dirname,`../LICENSE.txt`), { name: `license.txt` });

        // finalize it and save it
        archive.finalize();
    })
};

async function processZIP(array, dest) {

    // set counter vars
    const inputCount = array.length;
    let outputCount = 0

    // inform the user that the process started
    console.log(`${chalk.blue('info')} Starting ${chalk.bold('single icon ZIP')} generation...`)

    var result = array.map(async item => {
        return await new Promise((resolve, reject) => {
            generateSingleZIP(item)
                // success
                .then(res => {
                    outputCount++;
                    console.log(`${chalk.blue('info')} ${chalk.bold(outputCount)}/${chalk.bold(inputCount)} - ${item}.zip finished!`)
                    resolve(item);
                },
                    // error
                    rej => {
                        outputCount++;
                        console.log(`${"\n"}${chalk.red('error')} ${chalk.bold(outputCount)}/${chalk.bold(inputCount)} - ${item}.zip failed!`)
                        reject(rej.stack);
                    })
                // catch any unwanted errors
                .catch(err => {
                    reject(err);
                })
        })
    })

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
testSource(true, true, true).then(
    res => { processZIP(config.iconArray, config.zipDestPath); }, rej => {
        console.error(`${chalk.red('error')} Source checks failed, aborting...`);
        return;
    })
    .catch(err => {
        console.error(`${chalk.red('error')} Source checks failed, aborting...`);
        console.error(err);
        return;
    })