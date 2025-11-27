"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyValidation = void 0;
const enums_1 = require("../utils/enums");
class MyValidation {
    constructor() {
        this.errors = [];
    }
    validateRegister(options) {
        this.email(options.email);
        this.password(options.password);
        this.isMatch(options.password, options.confirmPassword);
        this.emptyText("name", options.name);
        this.emptyText("dialCode", options.dialCode);
        this.emptyText("phoneNumber", options.phoneNumber);
        this.accepted(options.acceptedTermsAndConditions);
        return this.errors;
    }
    validateBooking(options) {
        this.emptyText(enums_1.FieldInput.TITLE, options.title);
        this.emptyText(enums_1.FieldInput.BODY, options.body);
        return this.errors;
    }
    emptyText(field, text) {
        if (text === null || text.length === 0) {
            this.errors.push({
                field: field,
                message: "required input",
            });
        }
    }
    isMatch(password, confirmPassword) {
        if (password !== confirmPassword) {
            this.errors.push({
                field: "password",
                message: "must match to confirm password",
            }, {
                field: "confirm_password",
                message: "must match to password",
            });
        }
    }
    password(password) {
        if (password.length < 6) {
            this.errors.push({
                field: "password",
                message: "Password must be at least 6 characters long.",
            });
        }
    }
    email(email) {
        const emailRegExp = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");
        if (!emailRegExp.exec(email)) {
            this.errors.push({
                field: "email",
                message: "Invalid email address.",
            });
        }
    }
    accepted(value) {
        if (!value) {
            this.errors.push({
                field: "terms_and_conditions",
                message: "must accept terms and conditions to proceed",
            });
        }
    }
}
exports.MyValidation = MyValidation;
