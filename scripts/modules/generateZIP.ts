/* eslint-disable unicorn/filename-case */
import fs from "fs";
import path from "path";
import archiver from "archiver";

import * as config from "../config";

export default async function generateZIP(sourceFolder) {
    return new Promise((resolve, reject) => {
        // initialize archiver
        const itemName = path.basename(sourceFolder);
        const output = fs.createWriteStream(path.normalize(`${sourceFolder}/${itemName}.zip`));
        const archive = archiver("zip", {
            zlib: { level: 9 },
            store: true
        });
        // catch errors
        output.on("error", error => {
            reject(error);
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
        archive.append(fs.createReadStream(`${sourceFolder}/${itemName}.svg`), {
            name: `${itemName}.svg`
        });
        archive.append(fs.createReadStream(`${sourceFolder}/${itemName}.png`), {
            name: `${itemName}.png`
        });
        archive.append(fs.createReadStream(`${sourceFolder}/${itemName}.ai`), {
            name: `${itemName}.ai`
        });
        archive.file(config.readmePath, { name: `readme.txt` });
        archive.file(config.licensePath, { name: `license.txt` });

        // finalize it and save it
        archive.finalize();
    });
}
