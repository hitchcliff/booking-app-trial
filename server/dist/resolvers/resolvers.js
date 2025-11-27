"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_1 = __importDefault(require("./user"));
const booking_1 = __importDefault(require("./booking"));
exports.resolvers = [
    user_1.default,
    booking_1.default
];
