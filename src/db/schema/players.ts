import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const players = pgTable("players", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
});
