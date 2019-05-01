const fs = require("fs");
const chalk = require('chalk');
const archiver = require('archiver');
const moment = require('moment');

const config = require("./config.js");
const testSource = require("./util/testSource.js");
const packageConfig = require('../package.json');

function processPACKAGE(dest) {

    // filename of the package zip
    const filename = `r6-operatoricons-${packageConfig.version}.zip`;

    const package = new Promise((resolve, reject) => {
    // inform the user that the process started
    console.log(`${chalk.blue('info')} Starting ${chalk.bold('package')} generation...`)
    //initialize archiver
    const output = fs.createWriteStream(dest + filename);
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
    archive.file(path.join(__dirname,`./util/readme.txt`), { name: `readme.txt` });
    archive.file(path.join(__dirname,`../LICENSE.MD`), { name: `license.txt` });
    archive.directory(config.aiPath, 'Illustrator (AI)');
    archive.directory(config.pngPath, 'High-resolution PNG');
    archive.directory(config.svgPath, 'Scalable vector graphic (SVG)');

    // finalize it and save it
    archive.finalize();
    })

    // then output for success
    package.then(res => {
            console.log(`${chalk.green('success')} package finished!`)
            console.log(`${chalk.green('success')} Output location: ${chalk.bold(dest)}${filename}`)
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
    res => { processPACKAGE(config.packageDestPath); }, rej => {
        console.error(`${chalk.red('error')} Source checks failed, aborting...`);
        return;
    })
    .catch(err => {
        console.error(`${chalk.red('error')} Source checks failed, aborting...`);
        console.error(err);
        return;
    })