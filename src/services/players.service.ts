import { db } from "../db/client";
import { players } from "../db/schema/players";
import { playerFactions } from "../db/schema/playerFactions";
import { factions } from "../db/schema/factions";
import { eq, isNull, and } from "drizzle-orm";
import { PlayerInput } from "../validation/player";

export const getAllPlayers = async () => {
    const result = await db.select()
        .from(players)
        .where(isNull(players.deletedAt));

    return Promise.all(result.map(async (player) => {
        const playerFacs = await db.select({
            id: factions.id,
            name: factions.name,
            allegiance: factions.allegiance,
        })
            .from(playerFactions)
            .innerJoin(factions, eq(playerFactions.factionId, factions.id))
            .where(eq(playerFactions.playerId, player.id));

        return { ...player, factions: playerFacs };
    }));
};

export const getPlayerById = async (id: number) => {
    const result = await db.select()
        .from(players)
        .where(and(eq(players.id, id), isNull(players.deletedAt)));

    if (!result[0]) return null;

    const playerFacs = await db.select({
        id: factions.id,
        name: factions.name,
        allegiance: factions.allegiance,
    })
        .from(playerFactions)
        .innerJoin(factions, eq(playerFactions.factionId, factions.id))
        .where(eq(playerFactions.playerId, id));

    return { ...result[0], factions: playerFacs };
};

export const createPlayer = async (data: PlayerInput) => {
    const { factionIds, ...playerData } = data;

    const [player] = await db.insert(players).values(playerData).returning();

    if (factionIds?.length) {
        await db.insert(playerFactions).values(
            factionIds.map(factionId => ({ playerId: player.id, factionId }))
        );
    }

    return getPlayerById(player.id);
};

export const updatePlayer = async (id: number, data: PlayerInput) => {
    const { factionIds, ...playerData } = data;

    const [updated] = await db.update(players)
        .set(playerData)
        .where(and(eq(players.id, id), isNull(players.deletedAt)))
        .returning();

    if (!updated) return null;

    // Replace factions
    await db.delete(playerFactions).where(eq(playerFactions.playerId, id));

    if (factionIds?.length) {
        await db.insert(playerFactions).values(
            factionIds.map(factionId => ({ playerId: id, factionId }))
        );
    }

    return getPlayerById(id);
};

export const deletePlayer = async (id: number) => {
    const [deleted] = await db.update(players)
        .set({ deletedAt: new Date() })
        .where(and(eq(players.id, id), isNull(players.deletedAt)))
        .returning();

    return deleted || null;
};
