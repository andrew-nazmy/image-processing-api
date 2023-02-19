"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const src_1 = __importDefault(require("../src"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const app = (0, express_1.default)();
const port = 3000;
app.get("/api/images", 
//eslint-disable-next-line 
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const width = req.query.width;
    const height = req.query.height;
    const inFile = "./images/" + filename + ".jpg";
    if (filename.length === 0 || width.length === 0 || height.length === 0) {
        res.send("missing parameters");
    }
    else if (parseInt(width) <= 0 ||
        parseInt(height) <= 0 ||
        !/^\d+$/.test(width) ||
        !/^\d+$/.test(height)) {
        res.send("please provide regular parameters ");
    }
    else if (!fs_extra_1.default.existsSync(inFile)) {
        res.send("file name doesn't exsite");
    }
    else {
        yield (0, src_1.default)(filename, parseInt(width), parseInt(height));
        res.sendFile(filename + "_" + width.toString() + "_" + height.toString() + ".jpg", { root: path_1.default.join(__dirname + "/../../images/resized/") });
    }
}));
app.listen(port, () => {
    console.log("server started");
});
exports.default = app;
