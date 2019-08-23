/* eslint-disable unicorn/filename-case */
import path from "path";
import sharp from "sharp";

import * as config from "../config";

export default async function generatePNG(sourceFile) {
    // get file name + init sharp
    const fileName = path.basename(sourceFile, path.extname(sourceFile));
    const image = sharp(sourceFile, { density: 400 });

    return new Promise((resolve, reject) => {
        image
            // get file metadata
            .metadata()
            // check if file is svg
            .then(metadata => {
                if (metadata.format !== "svg") {
                    throw new Error(`The source file is not an SVG file! - ${path.normalize(sourceFile)}`);
                } else {
                    return;
                }
            })
            // execute image manipulations (resize image and save it as png)
            .then(() => {
                return image
                    .resize(config.pngConfig.height, config.pngConfig.width) // resize image
                    .png({ force: true }) // force PNG output
                    .toFile(path.normalize(`${path.dirname(sourceFile)}/${fileName}.png`)); // save to file
            })
            // finish promise
            .then(
                onFulfilled => {
                    return resolve(onFulfilled);
                },
                onRejected => {
                    return reject(onRejected);
                }
            )
            // catch unexpected errors
            .catch(error => {
                return reject(error);
            });
    });
}
