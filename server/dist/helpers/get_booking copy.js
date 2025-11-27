"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getBooking;
const Booking_1 = __importDefault(require("../entities/Booking"));
async function getBooking({ id, }) {
    const booking = await Booking_1.default.findOne({
        where: {
            id,
        },
    });
    return booking;
}
