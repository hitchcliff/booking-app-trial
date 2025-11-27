"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.options = void 0;
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities/entities");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
exports.options = {
    type: "postgres",
    url: process.env.DB_URL,
    synchronize: true,
    logging: true,
    subscribers: [],
    entities: entities_1.entities,
    migrations: [path_1.default.join(__dirname, "./migrations/*")],
};
exports.AppDataSource = new typeorm_1.DataSource(exports.options);
