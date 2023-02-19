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
const __1 = __importDefault(require(".."));
const fs_extra_1 = __importDefault(require("fs-extra"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const outDir = "./images/resized/";
const filenameExist = "palmtunnel";
const filenameInvalid = "x";
const width = 100;
const height = 100;
const request = (0, supertest_1.default)(server_1.default);
describe("image resize function description", () => {
    it("testNormalCase spec", () => __awaiter(void 0, void 0, void 0, function* () {
        const outFile = outDir +
            filenameExist +
            "_" +
            width.toString() +
            "_" +
            height.toString() +
            ".jpg";
        yield (0, __1.default)(filenameExist, width, height);
        expect(fs_extra_1.default.existsSync(outFile)).toEqual(true);
    }));
    it("testInputFileNotFoundCase spec", () => __awaiter(void 0, void 0, void 0, function* () {
        const outFile = outDir +
            filenameInvalid +
            "_" +
            width.toString() +
            "_" +
            height.toString() +
            ".jpg";
        yield (0, __1.default)(filenameInvalid, width, height);
        expect(fs_extra_1.default.existsSync(outFile)).toEqual(false);
    }));
    it("gets the api endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images/?filename=santamonica&width=200&height=300");
        expect(response.status).toBe(200);
        fs_extra_1.default.removeSync("./images/resized/santamonica_200_300.jpg");
    }));
});
