import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const games = pgTable("games", {
    id: serial("id").primaryKey(),
    player1: text("player1").notNull(),
    player2: text("player2").notNull(),
    result: text("result").notNull(), // "Victory Drukhari" etc
    mission: text("mission"),
    armyPoints: text("army_points"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow()
});