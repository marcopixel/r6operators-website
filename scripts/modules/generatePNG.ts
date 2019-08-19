import path from "path";
import sharp from "sharp";

import * as config from "../config";

// convert a single SVG file to an PNG
export default async function generatePNG(fileName, srcPath) {
    const file = path.join(srcPath + fileName + ".svg");
    // set DPI and fileName
    const image = sharp(file, { density: 400 });

    await new Promise((resolve, reject) => {
        image
            // get metadata from source file
            .metadata()
            .then(res => {
                // check if file is a valid SVG file
                if (res.format === "svg") {
                    image
                        .resize(config.pngConfig.height, config.pngConfig.width) // resize image
                        .png({ force: true }) // force PNG output
                        .toFile(srcPath + fileName + ".png")
                        .then(
                            res => {
                                // success
                                resolve(res);
                            },
                            rej => {
                                // fail
                                reject(rej);
                            }
                        )
                        // catch any errors on conversation
                        .catch(err => {
                            reject(err);
                        });
                } else {
                    // throw error if file is not a SVG
                    reject(new Error("File is not an SVG"));
                }
            })
            // catch unexpected errors
            .catch(err => {
                reject(err);
            });
    });
}
