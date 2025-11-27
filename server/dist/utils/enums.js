"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldMessage = exports.FieldInput = exports.UserAccountType = exports.UserRole = void 0;
const type_graphql_1 = require("type-graphql");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserAccountType;
(function (UserAccountType) {
    UserAccountType["BOOKER"] = "booker";
    UserAccountType["AGENT"] = "agent";
    UserAccountType["SELLER"] = "seller";
})(UserAccountType || (exports.UserAccountType = UserAccountType = {}));
var FieldInput;
(function (FieldInput) {
    FieldInput["ID"] = "id";
    FieldInput["UID"] = "uid";
    FieldInput["OPTIONS"] = "options";
    FieldInput["TITLE"] = "title";
    FieldInput["BODY"] = "body";
})(FieldInput || (exports.FieldInput = FieldInput = {}));
var FieldMessage;
(function (FieldMessage) {
    FieldMessage["REQUIRED"] = "required";
})(FieldMessage || (exports.FieldMessage = FieldMessage = {}));
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
