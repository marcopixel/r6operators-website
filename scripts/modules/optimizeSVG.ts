import path from "path";
import SVGO from "svgo";
import { promises as fs } from "fs";

import * as config from "../config";

// optimize a single SVG file via SVGO
export default function optimizeSVG(fileName, srcPath) {
    // init
    const file = path.join(srcPath + fileName + ".svg");
    const svgo = new SVGO(config.svgoConfig);

    return new Promise((resolve, reject) => {
        // read file buffer
        fs.readFile(file, "utf-8").then(async res => {
            svgo.optimize(res)
                .then(
                    async res => {
                        // save buffer to file
                        await fs.writeFile(file, res.data, { encoding: "utf-8" }).then(_res => resolve(_res));
                    },
                    async rej => {
                        await reject(rej);
                    }
                )
                // catch errors
                .catch(err => reject(err));
        });
    });
}
