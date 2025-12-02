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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeResponse = exports.LikeBookingInput = exports.AppointmentResponse = exports.CreateAppointmentInput = exports.BookingResponse = exports.ReadBookingInput = exports.CreateBookingInput = exports.UpdateRoleInput = exports.UserResponse = exports.RegisterInput = exports.LoginInput = exports.FieldError = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = __importDefault(require("../entities/User"));
const Booking_1 = __importDefault(require("../entities/Booking"));
const Appointment_1 = __importDefault(require("../entities/Appointment"));
const Like_1 = __importDefault(require("../entities/Like"));
let FieldError = class FieldError {
};
exports.FieldError = FieldError;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
exports.FieldError = FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
let LoginInput = class LoginInput {
};
exports.LoginInput = LoginInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
exports.LoginInput = LoginInput = __decorate([
    (0, type_graphql_1.InputType)()
], LoginInput);
let RegisterInput = class RegisterInput {
};
exports.RegisterInput = RegisterInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "confirmPassword", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "dialCode", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "phoneNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "accountType", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], RegisterInput.prototype, "acceptedTermsAndConditions", void 0);
exports.RegisterInput = RegisterInput = __decorate([
    (0, type_graphql_1.InputType)()
], RegisterInput);
let UserResponse = class UserResponse {
};
exports.UserResponse = UserResponse;
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.default, { nullable: true }),
    __metadata("design:type", User_1.default)
], UserResponse.prototype, "user", void 0);
exports.UserResponse = UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
let UpdateRoleInput = class UpdateRoleInput {
};
exports.UpdateRoleInput = UpdateRoleInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateRoleInput.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateRoleInput.prototype, "role", void 0);
exports.UpdateRoleInput = UpdateRoleInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateRoleInput);
let CreateBookingInput = class CreateBookingInput {
};
exports.CreateBookingInput = CreateBookingInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateBookingInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateBookingInput.prototype, "body", void 0);
exports.CreateBookingInput = CreateBookingInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateBookingInput);
let ReadBookingInput = class ReadBookingInput {
};
exports.ReadBookingInput = ReadBookingInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ReadBookingInput.prototype, "take", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ReadBookingInput.prototype, "skip", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ReadBookingInput.prototype, "search", void 0);
exports.ReadBookingInput = ReadBookingInput = __decorate([
    (0, type_graphql_1.InputType)()
], ReadBookingInput);
let BookingResponse = class BookingResponse {
};
exports.BookingResponse = BookingResponse;
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], BookingResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Booking_1.default, { nullable: true }),
    __metadata("design:type", Booking_1.default)
], BookingResponse.prototype, "booking", void 0);
exports.BookingResponse = BookingResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], BookingResponse);
let CreateAppointmentInput = class CreateAppointmentInput {
};
exports.CreateAppointmentInput = CreateAppointmentInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateAppointmentInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateAppointmentInput.prototype, "date", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateAppointmentInput.prototype, "from", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateAppointmentInput.prototype, "to", void 0);
exports.CreateAppointmentInput = CreateAppointmentInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateAppointmentInput);
let AppointmentResponse = class AppointmentResponse {
};
exports.AppointmentResponse = AppointmentResponse;
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], AppointmentResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Appointment_1.default, { nullable: true }),
    __metadata("design:type", Appointment_1.default)
], AppointmentResponse.prototype, "appointment", void 0);
exports.AppointmentResponse = AppointmentResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], AppointmentResponse);
let LikeBookingInput = class LikeBookingInput {
};
exports.LikeBookingInput = LikeBookingInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], LikeBookingInput.prototype, "bookingId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], LikeBookingInput.prototype, "value", void 0);
exports.LikeBookingInput = LikeBookingInput = __decorate([
    (0, type_graphql_1.InputType)()
], LikeBookingInput);
let LikeResponse = class LikeResponse {
};
exports.LikeResponse = LikeResponse;
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], LikeResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Like_1.default, { nullable: true }),
    __metadata("design:type", Like_1.default)
], LikeResponse.prototype, "like", void 0);
exports.LikeResponse = LikeResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], LikeResponse);
