import fs from "fs";
import archiver from "archiver";

import * as config from "../config";

// add all single icon files into a zip archive
export default async function generateZIP(fileName, srcPath) {
    return new Promise((resolve, reject) => {
        // initialize archiver
        const output = fs.createWriteStream(srcPath + `${fileName}.zip`);
        const archive = archiver("zip", {
            zlib: { level: 9 }, // Sets the compression level.
            store: true
        });
        // catch errors
        output.on("error", error => {
            if (error.code === "ENOENT") {
                reject(error);
            } else {
                reject(error);
            }
        });

        // resolve on finish
        output.on("finish", () => {
            resolve(output);
        });

        // catch warnings (ie stat failures and other non-blocking errors)
        archive.on("warning", error => {
            reject(error);
        });

        // catch errors
        archive.on("error", error => {
            reject(error);
        });

        // pipe archive data to the file
        archive.pipe(output);

        // add files to zip
        archive.append(fs.createReadStream(`${srcPath}/${fileName}.svg`), { name: `${fileName}.svg` });
        archive.append(fs.createReadStream(`${srcPath}/${fileName}.png`), { name: `${fileName}.png` });
        archive.append(fs.createReadStream(`${srcPath}/${fileName}.ai`), { name: `${fileName}.ai` });
        archive.file(config.readmePath, { name: `readme.txt` });
        archive.file(config.licensePath, { name: `license.txt` });

        // finalize it and save it
        archive.finalize();
    });
}
