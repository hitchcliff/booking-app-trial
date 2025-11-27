"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("@firebase/auth");
const firebase_1 = __importDefault(require("../utils/firebase"));
class AuthRepository {
    constructor() {
        this.auth = (0, auth_1.getAuth)((0, firebase_1.default)());
    }
    async registerWithEmailAndPassword({ email, password, }) {
        try {
            return await (0, auth_1.createUserWithEmailAndPassword)(this.auth, email, password);
        }
        catch (error) {
            throw error;
        }
    }
    async loginWithEmailAndPassword({ email, password, }) {
        try {
            return await (0, auth_1.signInWithEmailAndPassword)(this.auth, email, password);
        }
        catch (error) {
            throw error;
        }
    }
    async logout() {
        try {
            await (0, auth_1.signOut)(this.auth);
        }
        catch (e) {
            throw "Something went wrong ${e.toString}";
        }
    }
}
exports.default = AuthRepository;
