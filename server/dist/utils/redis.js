"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisStore = exports.client = void 0;
const connect_redis_1 = require("connect-redis");
const redis_1 = require("redis");
exports.client = (0, redis_1.createClient)({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: "redis-12342.crce185.ap-seast-1-1.ec2.redns.redis-cloud.com",
        port: 12342,
    },
});
exports.client.on("error", (err) => {
    console.error(`Redis Error: ${err}`);
});
exports.client.on("connect", () => {
    console.log("Connected to Redis");
});
exports.redisStore = new connect_redis_1.RedisStore({
    client: exports.client,
    disableTouch: true,
});
