"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkUser;
const User_1 = __importDefault(require("../entities/User"));
const get_user_id_1 = __importDefault(require("../helpers/get_user_id"));
const auth_repository_1 = __importDefault(require("../repository/auth_repository"));
async function checkUser(role) {
    const authRepository = new auth_repository_1.default();
    const userId = (0, get_user_id_1.default)();
    if (authRepository.auth.currentUser === null && !userId) {
        return "not authenticated";
    }
    const user = await User_1.default.findOne({
        where: {
            id: userId,
        },
    });
    if ((user === null || user === void 0 ? void 0 : user.role) !== role) {
        return "not an admin account";
    }
    return "";
}
