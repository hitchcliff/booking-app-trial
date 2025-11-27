"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUser;
const User_1 = __importDefault(require("../entities/User"));
async function getUser({ id, }) {
    const user = await User_1.default.findOne({
        where: {
            id,
        },
    });
    return user;
}
