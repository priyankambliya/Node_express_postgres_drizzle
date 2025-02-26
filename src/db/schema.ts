import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm'
import { UserRole } from "../utils/enums";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    mobile: varchar({ length: 255 }).unique().notNull(),
    password: varchar({ length: 255 }).notNull(),
    role: integer().default(UserRole.SubAdmin).notNull(),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().defaultNow().notNull().$onUpdateFn(() => sql`CURRENT_TIMESTAMP`)
});