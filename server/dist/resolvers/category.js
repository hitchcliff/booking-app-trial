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
const Category_1 = __importDefault(require("../entities/Category"));
const enums_1 = require("../utils/enums");
const validation_1 = require("../helpers/validation");
const is_auth_1 = __importDefault(require("../middleware/is_auth"));
const is_auth_admin_1 = __importDefault(require("../middleware/is_auth_admin"));
const type_1 = require("../utils/type");
let CategoryResolver = class CategoryResolver {
    async uploadCategory(options) {
        try {
            const validate = new validation_1.MyValidation().validateCategory(options);
            if (validate.length) {
                return {
                    errors: validate,
                };
            }
            const category = await Category_1.default.save({
                image: options.image,
                path: options.path,
                name: options.name,
            });
            return {
                category,
            };
        }
        catch (errors) {
            return errors;
        }
    }
    async updateCategoryById(options) {
        var _a, _b, _c;
        try {
            const oldCategory = await Category_1.default.findOneBy({
                id: options.id,
            });
            const updated = await Category_1.default.update({
                id: options.id,
            }, {
                name: ((_a = options.name) === null || _a === void 0 ? void 0 : _a.length) ? options.name : oldCategory === null || oldCategory === void 0 ? void 0 : oldCategory.name,
                image: (_b = options.image) !== null && _b !== void 0 ? _b : oldCategory === null || oldCategory === void 0 ? void 0 : oldCategory.image,
                path: (_c = options.path) !== null && _c !== void 0 ? _c : oldCategory === null || oldCategory === void 0 ? void 0 : oldCategory.path,
            });
            if (!updated.affected) {
                return {
                    errors: [
                        {
                            field: enums_1.FieldInput.UPDATE_CATEGORY,
                            message: `cannot find the category with id ${options.id}`,
                        },
                    ],
                };
            }
            const category = await Category_1.default.findOneBy({
                id: options.id,
            });
            return {
                category: category,
            };
        }
        catch (error) {
            return error;
        }
    }
    async deleteCategoryById(id) {
        try {
            const banner = await Category_1.default.delete({ id });
            if (!banner.affected) {
                return false;
            }
            return true;
        }
        catch (error) {
            return error;
        }
    }
    async readCategory() {
        try {
            return await Category_1.default.find({
                order: {
                    id: "ASC",
                },
            });
        }
        catch (error) {
            return error;
        }
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_admin_1.default),
    (0, type_graphql_1.Mutation)(() => type_1.CategoryResponse),
    __param(0, (0, type_graphql_1.Arg)(enums_1.FieldInput.OPTIONS)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_1.CategoryInput]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "uploadCategory", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_admin_1.default),
    (0, type_graphql_1.Mutation)(() => type_1.CategoryResponse),
    __param(0, (0, type_graphql_1.Arg)(enums_1.FieldInput.OPTIONS)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_1.CategoryUpdateInput]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "updateCategoryById", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_admin_1.default),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)(enums_1.FieldInput.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "deleteCategoryById", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_1.default),
    (0, type_graphql_1.Query)(() => [Category_1.default], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "readCategory", null);
CategoryResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CategoryResolver);
exports.default = CategoryResolver;
