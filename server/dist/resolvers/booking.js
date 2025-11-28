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
const type_graphql_1 = require("type-graphql");
const Booking_1 = __importDefault(require("../entities/Booking"));
const get_user_id_1 = __importDefault(require("../helpers/get_user_id"));
const validation_1 = require("../helpers/validation");
const is_auth_admin_1 = __importDefault(require("../middleware/is_auth_admin"));
const enums_1 = require("../utils/enums");
const type_1 = require("../utils/type");
let BookingResolver = class BookingResolver {
    async createBooking(options) {
        const userId = (0, get_user_id_1.default)();
        const errors = new validation_1.MyValidation().validateBooking(options);
        console.log(errors);
        if (errors.length) {
            return {
                errors,
            };
        }
        const booking = await Booking_1.default.save({
            ...options,
            user: {
                id: userId,
            },
        });
        return {
            booking,
        };
    }
    async readAllBookings() {
        return await Booking_1.default.find({
            order: {
                id: "DESC",
            },
            relations: {
                user: true,
                appointments: true,
            },
        });
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
    async deleteAllBookings() {
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
    (0, type_graphql_1.UseMiddleware)(is_auth_admin_1.default),
    (0, type_graphql_1.Mutation)(() => type_1.BookingResponse),
    __param(0, (0, type_graphql_1.Arg)(enums_1.FieldInput.OPTIONS)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_1.CreateBookingInput]),
    __metadata("design:returntype", Promise)
], BookingResolver.prototype, "createBooking", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Booking_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingResolver.prototype, "readAllBookings", null);
__decorate([
    (0, type_graphql_1.Query)(() => Booking_1.default, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)(enums_1.FieldInput.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookingResolver.prototype, "readBookingById", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_admin_1.default),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)(enums_1.FieldInput.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookingResolver.prototype, "deleteBookingById", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_admin_1.default),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingResolver.prototype, "deleteAllBookings", null);
BookingResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], BookingResolver);
exports.default = BookingResolver;
