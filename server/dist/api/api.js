"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const upload_single_img_1 = __importDefault(require("./upload_single_img"));
const check_user_1 = __importDefault(require("../middleware/check_user"));
const enums_1 = require("../utils/enums");
class API {
    constructor(app, storage) {
        this.app = app;
        this.multer = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
        this.storage = storage;
    }
    routes() {
        this.app.post(enums_1.APIRoute.ROUTE_ADMIN_UPLOAD_CATEGORY, this.multer.single("file"), async (req, res) => {
            const error = await (0, check_user_1.default)(enums_1.UserRole.ADMIN);
            const { path } = req.body;
            if (!!error) {
                return res.send({
                    url: "",
                    path: path,
                    error,
                });
            }
            const uploadSingleImg = new upload_single_img_1.default(req, res);
            return uploadSingleImg.upload(this.storage, path);
        });
    }
}
exports.default = API;
