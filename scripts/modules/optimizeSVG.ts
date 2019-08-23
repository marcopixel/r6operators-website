/* eslint-disable unicorn/filename-case */
import SVGO from "svgo";
import { promises as fs } from "fs";

import * as config from "../config";

export default async function optimizeSVG(sourceFile) {
    // init SVGO
    const svgo = new SVGO(config.svgoConfig);

    return new Promise((resolve, reject) => {
        // read file buffer
        fs.readFile(sourceFile, "utf-8")
            // apply optimizations
            .then(async response => {
                return svgo.optimize(response);
            })
            // save buffer to file
            .then(async response => {
                return fs.writeFile(sourceFile, response.data, { encoding: "utf-8" });
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
