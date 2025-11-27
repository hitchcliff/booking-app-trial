"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = void 0;
const User_1 = __importDefault(require("./User"));
const Booking_1 = __importDefault(require("./Booking"));
exports.entities = [
    User_1.default,
    Booking_1.default
];
