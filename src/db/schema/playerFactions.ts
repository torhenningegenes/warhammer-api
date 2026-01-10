import { pgTable, integer, primaryKey } from "drizzle-orm/pg-core";
import { players } from "./players";
import { factions } from "./factions";

export const playerFactions = pgTable("player_factions", {
    playerId: integer("player_id").notNull().references(() => players.id),
    factionId: integer("faction_id").notNull().references(() => factions.id),
}, (table) => ({
    pk: primaryKey({ columns: [table.playerId, table.factionId] }),
}));
