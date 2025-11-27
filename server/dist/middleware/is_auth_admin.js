"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../entities/User"));
const enums_1 = require("../utils/enums");
const get_user_id_1 = __importDefault(require("../helpers/get_user_id"));
const auth_repository_1 = __importDefault(require("../repository/auth_repository"));
const isAuthAdmin = async ({}, next) => {
    const authRepository = new auth_repository_1.default();
    const userId = (0, get_user_id_1.default)();
    if (authRepository.auth.currentUser === null && !userId) {
        throw new Error("not authenticated");
    }
    const user = await User_1.default.findOne({
        where: {
            id: userId,
        },
    });
    if ((user === null || user === void 0 ? void 0 : user.role) !== enums_1.UserRole.ADMIN) {
        throw new Error("not admin account");
    }
    return next();
};
exports.default = isAuthAdmin;
