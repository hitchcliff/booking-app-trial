"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("@firebase/storage");
const upload_storage_1 = __importDefault(require("../helpers/upload_storage"));
const auth_repository_1 = __importDefault(require("../repository/auth_repository"));
class UploadSingleImg {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this._authRepository = new auth_repository_1.default();
    }
    async upload(storage, path) {
        try {
            const file = this.req.file;
            const errors = [];
            if (!file) {
                errors.push({
                    field: "file",
                    message: "required field",
                });
                return this.res.send({ errors });
            }
            if (file.size >= 500000) {
                errors.push({
                    field: "file",
                    message: "file must be less than 500kb",
                });
            }
            if (!file.mimetype.includes("image")) {
                errors.push({
                    field: "file",
                    message: "must be an image",
                });
            }
            if (errors.length) {
                return this.res.send({
                    errors,
                });
            }
            const { snapshot, storageRef } = await new upload_storage_1.default(storage, file).upload(path);
            const imgUrl = await (0, storage_1.getDownloadURL)(snapshot.ref);
            return this.res.send({
                url: imgUrl,
                path: storageRef.fullPath,
            });
        }
        catch (error) {
            return this.res.send({
                url: "",
                path: "",
                error: error,
            });
        }
    }
}
exports.default = UploadSingleImg;
