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
const fs_extra_1 = __importDefault(require("fs-extra"));
const sharp_1 = __importDefault(require("sharp"));
function resizeImage(filename, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        const outDir = "./images/resized/";
        const inDir = "./images/";
        const outFile = outDir +
            filename +
            "_" +
            width.toString() +
            "_" +
            height.toString() +
            ".jpg";
        const inFile = inDir + filename + ".jpg";
        if (filename.length === 0 || isNaN(width) || isNaN(height)) {
        }
        else if (width <= 0 || height <= 0) {
        }
        else {
            fs_extra_1.default.ensureDirSync(outDir);
            if (fs_extra_1.default.existsSync(inFile)) {
                if (fs_extra_1.default.existsSync(outFile)) {
                }
                else {
                    yield (0, sharp_1.default)(inFile)
                        .resize({
                        width: width,
                        height: height,
                    })
                        .toFile(outFile);
                }
            }
            else {
            }
        }
    });
}
exports.default = resizeImage;
