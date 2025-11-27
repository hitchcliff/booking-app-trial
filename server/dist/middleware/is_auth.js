"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_repository_1 = __importDefault(require("../repository/auth_repository"));
const isAuth = async ({}, next) => {
    const authRepository = new auth_repository_1.default();
    if (authRepository.auth.currentUser === null) {
        throw new Error("not authenticated");
    }
    return next();
};
exports.default = isAuth;
