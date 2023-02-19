import express from "express";
import resizeImage from "../src";
import path from "path";
import fse from "fs-extra";

const app = express();
const port = 3000;

app.get(
  "/api/images",
  //eslint-disable-next-line 
  async (req: express.Request, res: express.Response) : Promise<void>=> {
    const filename = req.query.filename as string;
    const width = req.query.width as string;
    const height = req.query.height as string;
    const inFile = "./images/" + filename + ".jpg";
    if (filename.length === 0 || width.length === 0 || height.length === 0) {
      res.send("missing parameters");
    } else if (
      parseInt(width) <= 0 ||
      parseInt(height) <= 0 ||
      !/^\d+$/.test(width) ||
      !/^\d+$/.test(height)
    ) {
      res.send("please provide regular parameters ");
    } else if (!fse.existsSync(inFile)) {
      res.send("file name doesn't exsite");
    } else {
      await resizeImage(filename, parseInt(width), parseInt(height));
      res.sendFile(
        filename + "_" + width.toString() + "_" + height.toString() + ".jpg",
        { root: path.join(__dirname + "/../../images/resized/") }
      );
    }
  }
);

app.listen(port, () => {
  console.log("server started");
});

export default app;
