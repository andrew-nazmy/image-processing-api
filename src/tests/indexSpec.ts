import resizeImage from "..";
import fse from "fs-extra";
import supertest from "supertest";
import app from "../../server";

const outDir = "./images/resized/";
const filenameExist = "palmtunnel";
const filenameInvalid = "x";
const width = 100;
const height = 100;
const request = supertest(app);

describe("image resize function description", () => {
  it("testNormalCase spec", async () => {
    const outFile =
      outDir +
      filenameExist +
      "_" +
      width.toString() +
      "_" +
      height.toString() +
      ".jpg";
    await resizeImage(filenameExist, width, height);
    expect(fse.existsSync(outFile)).toEqual(true);
  });

  it("testInputFileNotFoundCase spec", async () => {
    const outFile =
      outDir +
      filenameInvalid +
      "_" +
      width.toString() +
      "_" +
      height.toString() +
      ".jpg";
    await resizeImage(filenameInvalid, width, height);
    expect(fse.existsSync(outFile)).toEqual(false);
  });

  it("gets the api endpoint", async () => {
    const response = await request.get(
      "/api/images/?filename=santamonica&width=200&height=300"
    );
    expect(response.status).toBe(200);
    fse.removeSync("./images/resized/santamonica_200_300.jpg");
  });
});
