"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
let connection_string = (_a = process.env['DATABASE_URL']) !== null && _a !== void 0 ? _a : 'postgres://postgres:1234@localhost:5432/postgres-drizzle-express';
const pool = new pg_1.Pool({
    connectionString: connection_string,
});
const db = (0, node_postgres_1.drizzle)({ client: pool });
pool.connect()
    .then(() => console.log("Database connection established"))
    .catch((err) => console.error("Failed to connect to database", err));
exports.default = db;
