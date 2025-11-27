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
const Banner_1 = __importDefault(require("../entities/Banner"));
const validation_1 = require("../helpers/validation");
const is_auth_1 = __importDefault(require("../middleware/is_auth"));
const is_auth_admin_1 = __importDefault(require("../middleware/is_auth_admin"));
const type_1 = require("../utils/type");
const enums_1 = require("../utils/enums");
let BannerResolver = class BannerResolver {
    async uploadBannerImg(img) {
        try {
            const validate = new validation_1.MyValidation().validateUploadBanner(img);
            if (validate.length) {
                return {
                    errors: validate,
                };
            }
            const banner = await Banner_1.default.save({
                image: img,
            });
            return {
                banner,
            };
        }
        catch (errors) {
            return errors;
        }
    }
    async updateBannerById(options) {
        try {
            const banner = await Banner_1.default.findOneBy({
                id: options.id,
            });
            if (!banner) {
                return {
                    errors: [
                        {
                            field: enums_1.FieldInput.BANNER_IMAGE,
                            message: `cannot find the banner with id ${options.id}`,
                        },
                    ],
                };
            }
            const validate = new validation_1.MyValidation().validateUploadBanner(options.image);
            if (validate.length) {
                return {
                    errors: validate,
                };
            }
            banner.image = options.image;
            await banner.save();
            return {
                banner,
            };
        }
        catch (error) {
            return error;
        }
    }
    async deleteBannerById(id) {
        try {
            const banner = await Banner_1.default.delete({ id });
            if (!banner.affected) {
                return false;
            }
            return true;
        }
        catch (error) {
            return error;
        }
    }
    async readBanners() {
        try {
            return await Banner_1.default.find({
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
    (0, type_graphql_1.Mutation)(() => type_1.BannerResponse),
    __param(0, (0, type_graphql_1.Arg)(enums_1.FieldInput.IMG)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BannerResolver.prototype, "uploadBannerImg", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_admin_1.default),
    (0, type_graphql_1.Mutation)(() => type_1.BannerResponse),
    __param(0, (0, type_graphql_1.Arg)(enums_1.FieldInput.OPTIONS)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_1.BannerUpdateInput]),
    __metadata("design:returntype", Promise)
], BannerResolver.prototype, "updateBannerById", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_admin_1.default),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)(enums_1.FieldInput.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BannerResolver.prototype, "deleteBannerById", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_1.default),
    (0, type_graphql_1.Query)(() => [Banner_1.default], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BannerResolver.prototype, "readBanners", null);
BannerResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], BannerResolver);
exports.default = BannerResolver;
