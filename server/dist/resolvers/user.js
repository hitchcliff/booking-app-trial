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
const User_1 = __importDefault(require("../entities/User"));
const firebase_auth_exceptions_1 = __importDefault(require("../exceptions/firebase_auth_exceptions"));
const get_user_id_1 = __importDefault(require("../helpers/get_user_id"));
const is_auth_1 = __importDefault(require("../middleware/is_auth"));
const auth_repository_1 = __importDefault(require("../repository/auth_repository"));
const type_1 = require("../utils/type");
const validation_1 = require("../helpers/validation");
const is_auth_admin_1 = __importDefault(require("../middleware/is_auth_admin"));
let UserResolver = class UserResolver {
    constructor() {
        this.authRepository = new auth_repository_1.default();
        this.firebaseAuthException = new firebase_auth_exceptions_1.default();
    }
    async register(options) {
        try {
            const errors = new validation_1.MyValidation().validateRegister(options);
            if (errors.length) {
                return {
                    errors,
                };
            }
            const emailExists = await User_1.default.findOne({
                where: {
                    email: options.email,
                },
            });
            if (emailExists) {
                errors.push({
                    field: "email",
                    message: "email already exists",
                });
                return { errors };
            }
            const registeredEmail = await this.authRepository.registerWithEmailAndPassword({
                email: options.email,
                password: options.password,
            });
            const user = await User_1.default.save({
                ...options,
                id: registeredEmail.user.uid,
                emailVerified: registeredEmail.user.emailVerified,
                email: registeredEmail.user.email,
            });
            return {
                user,
            };
        }
        catch (errors) {
            const firebaseError = [];
            if (!!errors.code) {
                firebaseError.push({
                    field: "exception",
                    message: this.firebaseAuthException.message(errors.code),
                });
            }
            return {
                errors: firebaseError,
            };
        }
    }
    async login(options) {
        try {
            const user = await User_1.default.findOne({
                where: {
                    email: options.email,
                },
            });
            if (!user) {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "email doesn't exists",
                        },
                    ],
                };
            }
            await this.authRepository.loginWithEmailAndPassword({
                email: options.email,
                password: options.password,
            });
            return {
                user,
            };
        }
        catch (errors) {
            let firebaseError;
            if (!!errors.code) {
                firebaseError = this.firebaseAuthException.message(errors.code);
            }
            return {
                errors: [
                    {
                        field: "exception",
                        message: firebaseError,
                    },
                ],
            };
        }
    }
    async logout() {
        try {
            await this.authRepository.logout();
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async me() {
        try {
            const userId = (0, get_user_id_1.default)();
            if (!userId)
                return null;
            const user = await User_1.default.findOne({
                where: { id: userId },
            });
            return user;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async updateRole(options) {
        try {
            const user = await User_1.default.findOne({
                where: {
                    id: options.userId,
                },
            });
            if (!user) {
                return {
                    errors: [
                        {
                            field: "update_role",
                            message: "cant find user by ID",
                        },
                    ],
                };
            }
            user.role = options.role;
            user.save();
            return {
                user,
            };
        }
        catch (error) {
            return error;
        }
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => type_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => type_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_1.LoginInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_1.default),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_1.default),
    (0, type_graphql_1.Query)(() => User_1.default, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_admin_1.default),
    (0, type_graphql_1.Mutation)(() => type_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_1.UpdateRoleInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateRole", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.default = UserResolver;
