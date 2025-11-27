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
const Appointment_1 = __importDefault(require("../entities/Appointment"));
const get_user_1 = __importDefault(require("../helpers/get_user"));
const get_user_id_1 = __importDefault(require("../helpers/get_user_id"));
const validation_1 = require("../helpers/validation");
const is_auth_1 = __importDefault(require("../middleware/is_auth"));
const is_auth_admin_1 = __importDefault(require("../middleware/is_auth_admin"));
const enums_1 = require("../utils/enums");
const type_1 = require("../utils/type");
let AppointmentResolver = class AppointmentResolver {
    async createAppointment(options) {
        const errors = new validation_1.MyValidation().validateAppointment(options);
        if (errors.length) {
            return {
                errors,
            };
        }
        const userId = (0, get_user_id_1.default)();
        const user = await (0, get_user_1.default)({ id: userId });
        if ((user === null || user === void 0 ? void 0 : user.accountType) !== enums_1.UserAccountType.BOOKER) {
            throw enums_1.FieldMessage.NOT_BOOKER;
        }
        const isAlreadyAppointed = await Appointment_1.default.findOne({
            where: {
                user: {
                    id: userId,
                },
                booking: {
                    id: options.id,
                },
            },
        });
        if (isAlreadyAppointed) {
            throw enums_1.FieldMessage.DUPLICATE;
        }
        const appointment = await Appointment_1.default.save({
            ...options,
            user: {
                id: userId,
            },
            booking: {
                id: options.id,
            },
        });
        return {
            appointment,
        };
    }
    async readAllAppointments() {
        return await Appointment_1.default.find();
    }
    async readAllMyAppointments() {
        const id = (0, get_user_id_1.default)();
        return await Appointment_1.default.find({
            where: {
                user: {
                    id,
                },
            },
        });
    }
    async readAppointmentsByBookingId(id) {
        return await Appointment_1.default.find({
            where: {
                booking: {
                    id,
                },
            },
        });
    }
    async deleteAppointmentById(id) {
        try {
            const booking = await Appointment_1.default.findOne({
                where: { id },
            });
            if (!Appointment_1.default)
                throw Error("no Appointment");
            await (booking === null || booking === void 0 ? void 0 : booking.remove());
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    async deleteAllAppointments() {
        try {
            const appointments = await Appointment_1.default.find();
            if (!appointments.length)
                throw Error("No Appointments");
            appointments.every((appointment) => appointment.remove());
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_1.default),
    (0, type_graphql_1.Mutation)(() => type_1.AppointmentResponse),
    __param(0, (0, type_graphql_1.Arg)(enums_1.FieldInput.OPTIONS)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_1.CreateAppointmentInput]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "createAppointment", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_admin_1.default),
    (0, type_graphql_1.Query)(() => [Appointment_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "readAllAppointments", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_1.default),
    (0, type_graphql_1.Query)(() => [Appointment_1.default], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "readAllMyAppointments", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_admin_1.default),
    (0, type_graphql_1.Query)(() => [Appointment_1.default], { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)(enums_1.FieldInput.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "readAppointmentsByBookingId", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_admin_1.default),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)(enums_1.FieldInput.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "deleteAppointmentById", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_admin_1.default),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "deleteAllAppointments", null);
AppointmentResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AppointmentResolver);
exports.default = AppointmentResolver;
