/* eslint-disable import/no-named-as-default-member */
// @ts-nocheck
import path from "path";
import archiver from "archiver";
import fs from "fs-extra";

export default async function generatePng(iconObject: {}): Promise<void> {
  // inform user that script has started
  console.log("Generate ZIP files...\n");

  // set counter vars + timer
  const inputCount = Object.keys(iconObject).length;
  let outputCount = 0;
  const startTimer = process.hrtime();

  // set output path
  const iconsPath = path.resolve(__dirname, "../../static/icons/");
  const outputPath = path.resolve(iconsPath, "./zip/");

  // map the icon object
  const result = Object.keys(iconObject).map(async (op) => {
    // check if folder exists and create if not
    fs.ensureDir(outputPath).catch((error) => {
      throw error;
    });

    // init archiver
    const output = fs.createWriteStream(outputPath + `/${op}.zip`);
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level.
    });

    // catch errors
    output.on("error", (error) => {
      if (error.code === "ENOENT") {
        throw error;
      } else {
        throw error;
      }
    });

    // resolve on finish
    output.on("finish", () => {
      return output;
    });

    // catch warnings (ie stat failures and other non-blocking errors)
    archive.on("warning", (error) => {
      throw error;
    });

    // pipe archive data to the file
    archive.pipe(output);

    // add files to zip
    archive.append(fs.createReadStream(`${iconsPath}/svg/${op}.svg`), {
      name: `${op}.svg`,
    });
    archive.append(fs.createReadStream(`${iconsPath}/png/${op}.png`), {
      name: `${op}.png`,
    });
    archive.file(path.join(__dirname, `../util/readme.txt`), { name: `readme.txt` });
    archive.file(path.join(__dirname, `../../LICENSE`), { name: `license.txt` });

    // finalize it and save it
    archive.finalize();

    // increase counter when finished and output it to the console
    outputCount += 1;
    console.log(`${outputCount}/${inputCount} - ${path.normalize(`${outputPath}/${op}.zip`)}`);

    // return operator name to promise
    return op;
  });

  // wait for all promises to finish
  await Promise.all(result)
    .then((resolved) => {
      console.info("\nFinished!");
      console.info(`Execution time: ${process.hrtime(startTimer)[0]} seconds`);
      console.log(`Output folder: ${iconsPath}\n`);
      return resolved;
    })
    .catch((error) => {
      throw error;
    });
}
