"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const enums_1 = require("../utils/enums");
exports.usersTable = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(),
    name: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    mobile: (0, pg_core_1.varchar)({ length: 255 }).unique().notNull(),
    password: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    role: (0, pg_core_1.integer)().default(enums_1.UserRole.SubAdmin).notNull(),
    created_at: (0, pg_core_1.timestamp)().defaultNow().notNull(),
    updated_at: (0, pg_core_1.timestamp)().defaultNow().notNull().$onUpdateFn(() => (0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
});
