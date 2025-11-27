"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUserId;
const auth_repository_1 = __importDefault(require("../repository/auth_repository"));
function getUserId() {
    var _a;
    const authRepository = new auth_repository_1.default();
    return (_a = authRepository.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid;
}
