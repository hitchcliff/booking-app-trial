"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processUpload = exports.storeUpload = void 0;
exports.default = getFileImg;
exports.readFileAsBuffer = readFileAsBuffer;
exports.deleteFile = deleteFile;
const fs_1 = require("fs");
const promises_1 = __importDefault(require("node:fs/promises"));
const path_1 = require("path");
async function getFileImg({ req, }) {
    try {
        const file = await req.body.variables.file_img.file;
        console.log(req.body);
        console.log("SERVER FILE: ", file);
        if (!file || !file.mimetype.includes("image"))
            return null;
        const result = await (0, exports.processUpload)(file);
        const newFile = await readFileAsBuffer(result.path);
        await deleteFile(result.path);
        if (newFile.byteLength >= 500000) {
            throw new Error("Length must not be >= 500kb");
        }
        return {
            newFile,
            result,
        };
    }
    catch (error) {
        throw new Error(error);
    }
}
const storeUpload = async ({ stream, filename }) => {
    const uploadDir = "./uploads";
    const path = (0, path_1.join)(uploadDir, filename);
    return new Promise((resolve, reject) => stream
        .pipe((0, fs_1.createWriteStream)(path))
        .on("finish", () => resolve({ path }))
        .on("error", reject));
};
exports.storeUpload = storeUpload;
const processUpload = async (upload) => {
    const { createReadStream, filename, mimetype } = await upload;
    const stream = createReadStream();
    const result = await (0, exports.storeUpload)({ stream, filename });
    return { filename, mimetype, path: result.path };
};
exports.processUpload = processUpload;
async function readFileAsBuffer(filePath) {
    try {
        const buffer = await promises_1.default.readFile(filePath);
        return buffer;
    }
    catch (error) {
        console.error("Error reading file:", error);
        throw error;
    }
}
async function deleteFile(filePath) {
    try {
        await promises_1.default.unlink(filePath);
        console.log("File deleted successfully!");
    }
    catch (err) {
        if (err.code === "ENOENT") {
            console.warn("File not found:", filePath);
        }
        else {
            console.error("Error deleting file:", err);
        }
    }
}
