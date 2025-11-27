"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("@firebase/storage");
class UploadStorage {
    constructor(storage, file) {
        this.date = new Date().getTime();
        this.file = file;
        this.storage = storage;
    }
    async upload(path) {
        var _a;
        const date = new Date().getTime();
        const newPath = path !== null && path !== void 0 ? path : `${process.env.FIREBASE_STORAGE_ADMIN_CATEGORIES}/${date}-${this.file.originalname}`;
        const storageRef = (0, storage_1.ref)(this.storage, newPath);
        const metadata = {
            contentType: (_a = this.file) === null || _a === void 0 ? void 0 : _a.mimetype,
        };
        const snapshot = await (0, storage_1.uploadBytesResumable)(storageRef, this.file.buffer, metadata);
        return {
            snapshot,
            storageRef,
        };
    }
}
exports.default = UploadStorage;
