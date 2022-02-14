"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const config = {
    test: {
        client: 'sqlite3',
        connection: ':memory:',
        useNullAsDefault: true,
        migrations: {
            directory: path_1.default.join(__dirname, 'db/migrations'),
        },
        seeds: {
            directory: path_1.default.join(__dirname, 'db/seeds'),
        },
    },
    development: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: path_1.default.join(__dirname, 'db/migrations'),
        },
        seeds: {
            directory: path_1.default.join(__dirname, 'db/seeds'),
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: path_1.default.join(__dirname, 'db/migrations'),
        },
        seeds: {
            directory: path_1.default.join(__dirname, 'db/seeds'),
        },
    },
};
exports.default = config;
