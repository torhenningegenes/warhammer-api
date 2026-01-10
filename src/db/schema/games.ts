import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { players } from "./players";
import { factions } from "./factions";

export const games = pgTable("games", {
    id: serial("id").primaryKey(),
    // Legacy text fields (kept for migration)
    player1: text("player1").notNull(),
    player2: text("player2").notNull(),
    player1Faction: text("player1_faction"),
    player2Faction: text("player2_faction"),
    // FK references
    player1Id: integer("player1_id").references(() => players.id),
    player2Id: integer("player2_id").references(() => players.id),
    player1FactionId: integer("player1_faction_id").references(() => factions.id),
    player2FactionId: integer("player2_faction_id").references(() => factions.id),
    result: text("result").notNull(), // "Drukhari win" etc
    mission: text("mission"),
    armyPoints: text("army_points"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow()
});