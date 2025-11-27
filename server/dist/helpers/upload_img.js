"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = uploadImg;
async function uploadImg({ req, }) {
    try {
        const file = await req.body.variables.file_img.file;
        if (!file || !file.mimetype.includes("image"))
            return null;
        return file;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
