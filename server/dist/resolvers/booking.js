"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Booking_1 = __importDefault(require("../entities/Booking"));
const type_graphql_1 = require("type-graphql");
let BookingResolver = class BookingResolver {
    async createBooking(body) {
        return await Booking_1.default.save({
            body,
        });
    }
    async readBookings() {
        return await Booking_1.default.find();
    }
    async readBookingById(id) {
        return await Booking_1.default.findOne({
            where: {
                id: id,
            },
        });
    }
    async deleteBookingById(id) {
        try {
            const booking = await Booking_1.default.findOne({
                where: { id },
            });
            if (!Booking_1.default)
                throw Error("no Booking");
            await (booking === null || booking === void 0 ? void 0 : booking.remove());
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    async deleteBookings() {
        try {
            const Bookings = await Booking_1.default.find();
            if (!Bookings.length)
                throw Error("No Bookings");
            Bookings.every((Booking) => Booking.remove());
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Booking_1.default),
    __param(0, (0, type_graphql_1.Arg)("body")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingResolver.prototype, "createBooking", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Booking_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingResolver.prototype, "readBookings", null);
__decorate([
    (0, type_graphql_1.Query)(() => Booking_1.default, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookingResolver.prototype, "readBookingById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookingResolver.prototype, "deleteBookingById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingResolver.prototype, "deleteBookings", null);
BookingResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], BookingResolver);
exports.default = BookingResolver;
