"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const port = (_a = process.env['REDIS_PORT']) !== null && _a !== void 0 ? _a : '6379';
const host = (_b = process.env['REDIS_HOST']) !== null && _b !== void 0 ? _b : 'localhost';
const redisClient = new ioredis_1.default(Number(port), host);
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});
redisClient.on('error', (error) => {
    console.error('Failed to connect to Redis', error);
});
exports.default = redisClient;
