"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIRoute = exports.FieldInput = exports.UserAccountType = exports.UserRole = void 0;
const type_graphql_1 = require("type-graphql");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserAccountType;
(function (UserAccountType) {
    UserAccountType["BUYER"] = "buyer";
    UserAccountType["SELLER"] = "seller";
})(UserAccountType || (exports.UserAccountType = UserAccountType = {}));
var FieldInput;
(function (FieldInput) {
    FieldInput["ID"] = "id";
    FieldInput["UID"] = "uid";
    FieldInput["IMG"] = "img";
    FieldInput["OPTIONS"] = "options";
    FieldInput["CATEGORY_NAME"] = "name";
    FieldInput["CATEGORY_IMAGE"] = "image";
    FieldInput["UPDATE_CATEGORY"] = "update_category";
    FieldInput["BANNER_IMAGE"] = "upload_image";
    FieldInput["FILE_IMG"] = "file_img";
})(FieldInput || (exports.FieldInput = FieldInput = {}));
var APIRoute;
(function (APIRoute) {
    APIRoute["ROUTE_ADMIN_UPLOAD_CATEGORY"] = "/api/admin/category/upload";
})(APIRoute || (exports.APIRoute = APIRoute = {}));
(0, type_graphql_1.registerEnumType)(UserRole, {
    name: "UserRole",
    description: "User roles",
});
(0, type_graphql_1.registerEnumType)(UserAccountType, {
    name: "UserAccountType",
    description: "Account type for users",
});
(0, type_graphql_1.registerEnumType)(FieldInput, {
    name: "FieldInput",
    description: "Field input strings",
});
(0, type_graphql_1.registerEnumType)(APIRoute, {
    name: "APIRoute",
    description: "API routes for API",
});
