import { pgTable, serial, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const allegianceEnum = pgEnum("allegiance", ["imperium", "chaos", "xenos"]);

export const factions = pgTable("factions", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    allegiance: allegianceEnum("allegiance").notNull(),
    createdAt: timestamp("created_at").defaultNow()
});
