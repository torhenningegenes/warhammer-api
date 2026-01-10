import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const games = pgTable("games", {
    id: serial("id").primaryKey(),
    player1: text("player1").notNull(),
    player2: text("player2").notNull(),
    player1Faction: text("player1_faction"),
    player2Faction: text("player2_faction"),
    result: text("result").notNull(), // "Drukhari win" etc
    mission: text("mission"),
    armyPoints: text("army_points"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow()
});