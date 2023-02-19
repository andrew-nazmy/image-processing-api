import fse from "fs-extra";
import sh from "sharp";

async function resizeImage(
  filename: string,
  width: number,
  height: number
): Promise<void> {
  const outDir = "./images/resized/";
  const inDir = "./images/";
  const outFile =
    outDir +
    filename +
    "_" +
    width.toString() +
    "_" +
    height.toString() +
    ".jpg";
  const inFile = inDir + filename + ".jpg";
  if (filename.length === 0 || isNaN(width) || isNaN(height)) {
  } else if (width <= 0 || height <= 0) {
  } else {
    fse.ensureDirSync(outDir);
    if (fse.existsSync(inFile)) {
      if (fse.existsSync(outFile)) {
      } else {
        await sh(inFile)
          .resize({
            width: width,
            height: height,
          })
          .toFile(outFile);
      }
    } else {
    }
  }
}

export default resizeImage;
