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
exports.CategoryUpdateInput = exports.CategoryInput = exports.CategoryResponse = exports.BannerUpdateInput = exports.BannerResponse = exports.UpdateRoleInput = exports.UserResponse = exports.RegisterInput = exports.LoginInput = exports.FieldError = void 0;
const type_graphql_1 = require("type-graphql");
const Banner_1 = __importDefault(require("./entities/Banner"));
const Category_1 = __importDefault(require("./entities/Category"));
const User_1 = __importDefault(require("./entities/User"));
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
let BannerResponse = class BannerResponse {
};
exports.BannerResponse = BannerResponse;
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], BannerResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Banner_1.default, { nullable: true }),
    __metadata("design:type", Banner_1.default)
], BannerResponse.prototype, "banner", void 0);
exports.BannerResponse = BannerResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], BannerResponse);
let BannerUpdateInput = class BannerUpdateInput {
};
exports.BannerUpdateInput = BannerUpdateInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], BannerUpdateInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], BannerUpdateInput.prototype, "image", void 0);
exports.BannerUpdateInput = BannerUpdateInput = __decorate([
    (0, type_graphql_1.InputType)()
], BannerUpdateInput);
let CategoryResponse = class CategoryResponse {
};
exports.CategoryResponse = CategoryResponse;
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], CategoryResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Category_1.default, { nullable: true }),
    __metadata("design:type", Category_1.default)
], CategoryResponse.prototype, "category", void 0);
exports.CategoryResponse = CategoryResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], CategoryResponse);
let CategoryInput = class CategoryInput {
};
exports.CategoryInput = CategoryInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CategoryInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], CategoryInput.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], CategoryInput.prototype, "path", void 0);
exports.CategoryInput = CategoryInput = __decorate([
    (0, type_graphql_1.InputType)()
], CategoryInput);
let CategoryUpdateInput = class CategoryUpdateInput extends CategoryInput {
};
exports.CategoryUpdateInput = CategoryUpdateInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CategoryUpdateInput.prototype, "id", void 0);
exports.CategoryUpdateInput = CategoryUpdateInput = __decorate([
    (0, type_graphql_1.InputType)()
], CategoryUpdateInput);
