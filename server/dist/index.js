"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("@firebase/storage");
const apollo_server_express_1 = require("apollo-server-express");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const constants_1 = require("./utils/constants");
const data_source_1 = require("./utils/data-source");
const firebase_1 = __importDefault(require("./utils/firebase"));
const get_my_ip_1 = __importDefault(require("./helpers/get_my_ip"));
const resolvers_1 = require("./resolvers/resolvers");
(async function main() {
    await data_source_1.AppDataSource.initialize();
    const app = (0, express_1.default)();
    const config = (0, firebase_1.default)();
    const storage = (0, storage_1.getStorage)(config);
    app.use((0, cookie_parser_1.default)(process.env.SESSION_SECRET));
    const cache = (0, express_session_1.default)({
        name: process.env.COOKIE_NAME,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 1,
            httpOnly: !constants_1.__prod__,
            sameSite: "lax",
            secure: true,
        },
    });
    if (constants_1.__prod__) {
        app.set("trust proxy", 1);
    }
    app.use(cache);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        csrfPrevention: constants_1.__prod__ ? true : false,
        cache: "bounded",
        persistedQueries: false,
        introspection: true,
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: resolvers_1.resolvers,
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            storage,
        }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app: app,
        cors: {
            origin: [
                "*",
                "http://localhost:3000",
                "https://studio.apollographql.com",
            ],
            credentials: true,
        },
    });
    const myIp = (0, get_my_ip_1.default)();
    app.listen(process.env.PORT, () => {
        console.log(`Browser: http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);
        console.log(`API Calls: http://${myIp}:${process.env.PORT}${apolloServer.graphqlPath}`);
    });
})().catch((err) => console.error(err));
