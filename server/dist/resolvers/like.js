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
const Like_1 = __importDefault(require("../entities/Like"));
const User_1 = __importDefault(require("../entities/User"));
const get_user_1 = __importDefault(require("../helpers/get_user"));
const get_user_id_1 = __importDefault(require("../helpers/get_user_id"));
const is_auth_1 = __importDefault(require("../middleware/is_auth"));
const is_auth_admin_1 = __importDefault(require("../middleware/is_auth_admin"));
const enums_1 = require("../utils/enums");
const type_1 = require("../utils/type");
let LikeResolver = class LikeResolver {
    async readAllLikes() {
        return await Like_1.default.find({
            relations: {
                user: true,
                booking: true,
            },
        });
    }
    async likeBooking(options) {
        var _a;
        const booking = await Booking_1.default.findOne({
            where: {
                id: options.bookingId,
            },
        });
        if (!booking) {
            throw enums_1.FieldMessage.NOT_AVAILABLE;
        }
        const userId = (0, get_user_id_1.default)();
        const user = await (0, get_user_1.default)({ id: userId });
        if ((user === null || user === void 0 ? void 0 : user.accountType) !== enums_1.UserAccountType.BOOKER) {
            throw enums_1.FieldMessage.NOT_BOOKER;
        }
        const isAlreadyLiked = await Like_1.default.findOne({
            where: {
                user: {
                    id: userId,
                },
                booking: {
                    id: options.bookingId,
                },
            },
        });
        if (isAlreadyLiked && isAlreadyLiked.value >= 1) {
            throw enums_1.FieldMessage.DUPLICATE;
        }
        let like = new Like_1.default();
        if (isAlreadyLiked && isAlreadyLiked.value <= 0) {
            isAlreadyLiked.value = 1;
            like = await isAlreadyLiked.save();
        }
        else {
            like.value = 1;
            like.user = user;
            like.booking = booking;
            like = await like.save();
        }
        const likes = (_a = booking.likes) !== null && _a !== void 0 ? _a : 0;
        booking.likes = likes + 1;
        await booking.save();
        return {
            like,
        };
    }
    async dislikeBooking(options) {
        var _a;
        const booking = await Booking_1.default.findOne({
            where: {
                id: options.bookingId,
            },
        });
        if (!booking) {
            throw enums_1.FieldMessage.NOT_AVAILABLE;
        }
        const userId = (0, get_user_id_1.default)();
        const user = await (0, get_user_1.default)({ id: userId });
        if ((user === null || user === void 0 ? void 0 : user.accountType) !== enums_1.UserAccountType.BOOKER) {
            throw enums_1.FieldMessage.NOT_BOOKER;
        }
        const isAlreadyLiked = await Like_1.default.findOne({
            where: {
                user: {
                    id: userId,
                },
                booking: {
                    id: options.bookingId,
                },
            },
        });
        if (!isAlreadyLiked) {
            throw enums_1.FieldMessage.NOT_AVAILABLE;
        }
        if (isAlreadyLiked.value <= 0) {
            throw enums_1.FieldMessage.NOT_AVAILABLE;
        }
        isAlreadyLiked.value = 0;
        const like = await isAlreadyLiked.save();
        const likes = (_a = booking.likes) !== null && _a !== void 0 ? _a : 0;
        booking.likes = likes - 1;
        await booking.save();
        return {
            like,
        };
    }
    async resetLikes() {
        const likes = await Like_1.default.find({
            relations: {
                booking: true,
                user: true,
            },
        });
        likes.every(async (like) => {
            const booking = await Booking_1.default.findOne({
                where: {
                    id: like.booking.id,
                },
            });
            booking.likes = 0;
            booking.userLikes = [];
            const user = await User_1.default.findOne({
                where: {
                    id: like.user.id,
                },
            });
            user.bookingLikes = [];
            await (booking === null || booking === void 0 ? void 0 : booking.save());
            await (user === null || user === void 0 ? void 0 : user.save());
            await like.remove();
        });
        return true;
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_1.default),
    (0, type_graphql_1.Query)(() => [Like_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LikeResolver.prototype, "readAllLikes", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_1.default),
    (0, type_graphql_1.Mutation)(() => type_1.LikeResponse),
    __param(0, (0, type_graphql_1.Arg)(enums_1.FieldInput.OPTIONS)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_1.LikeBookingInput]),
    __metadata("design:returntype", Promise)
], LikeResolver.prototype, "likeBooking", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_1.default),
    (0, type_graphql_1.Mutation)(() => type_1.LikeResponse),
    __param(0, (0, type_graphql_1.Arg)(enums_1.FieldInput.OPTIONS)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_1.LikeBookingInput]),
    __metadata("design:returntype", Promise)
], LikeResolver.prototype, "dislikeBooking", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_admin_1.default),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LikeResolver.prototype, "resetLikes", null);
LikeResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], LikeResolver);
exports.default = LikeResolver;
