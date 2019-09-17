import path from "path";
import { promises as fs } from "fs";

import * as config from "../config";

export default function buildIconsObject(array) {
    return new Promise((resolve, reject) => {
        const result = array.map(item => {
            // eslint-disable-next-line promise/param-names
            return new Promise((_resolve, _reject) => {
                const name: string = item;
                const filePath: string = path.join(`${config.sourcePath}${path.sep}${item}${path.sep}${item}.svg`);

                // read file to get SVG content
                fs.readFile(filePath, "utf8")
                    .then(output => {
                        const object = {
                            [name as string]: {
                                ["contents" as string]: output,
                                ...config.iconData[item]
                            }
                        };
                        return _resolve(object);
                    }) // if successful, resolve with new array
                    .catch(error => _reject(error)); // else reject with error
            });
        });

        // wait for all icons to finish
        Promise.all(result)
            .then(resolved => {
                // merge object containing arrays into one object
                const merged = Object.assign({}, ...resolved);
                return resolve(merged);
            })
            .catch(error => reject(error)); // reject error
    });
}
