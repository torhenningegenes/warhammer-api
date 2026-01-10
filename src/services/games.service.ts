import { db } from "../db/client";
import { games, players, factions } from "../db/schema";
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { GameInput } from "../validation/games";

const player1Alias = alias(players, "player1");
const player2Alias = alias(players, "player2");
const faction1Alias = alias(factions, "faction1");
const faction2Alias = alias(factions, "faction2");

export const getAllGames = async () => {
    return db
        .select({
            id: games.id,
            player1: player1Alias.name,
            player2: player2Alias.name,
            player1Id: games.player1Id,
            player2Id: games.player2Id,
            player1Faction: faction1Alias.name,
            player2Faction: faction2Alias.name,
            player1FactionId: games.player1FactionId,
            player2FactionId: games.player2FactionId,
            result: games.result,
            mission: games.mission,
            armyPoints: games.armyPoints,
            notes: games.notes,
            createdAt: games.createdAt,
        })
        .from(games)
        .leftJoin(player1Alias, eq(games.player1Id, player1Alias.id))
        .leftJoin(player2Alias, eq(games.player2Id, player2Alias.id))
        .leftJoin(faction1Alias, eq(games.player1FactionId, faction1Alias.id))
        .leftJoin(faction2Alias, eq(games.player2FactionId, faction2Alias.id));
};

export const createGame = async (data: GameInput) => {
    // Lookup player names for legacy columns
    const [p1] = await db.select().from(players).where(eq(players.id, data.player1Id));
    const [p2] = await db.select().from(players).where(eq(players.id, data.player2Id));

    if (!p1 || !p2) {
        throw new Error("Player not found");
    }

    // Lookup faction names if provided
    let f1Name: string | null = null;
    let f2Name: string | null = null;
    if (data.player1FactionId) {
        const [f1] = await db.select().from(factions).where(eq(factions.id, data.player1FactionId));
        f1Name = f1?.name ?? null;
    }
    if (data.player2FactionId) {
        const [f2] = await db.select().from(factions).where(eq(factions.id, data.player2FactionId));
        f2Name = f2?.name ?? null;
    }

    return db.insert(games).values({
        player1: p1.name,
        player2: p2.name,
        player1Id: data.player1Id,
        player2Id: data.player2Id,
        player1Faction: f1Name,
        player2Faction: f2Name,
        player1FactionId: data.player1FactionId,
        player2FactionId: data.player2FactionId,
        result: data.result,
        mission: data.mission,
        armyPoints: data.armyPoints,
        notes: data.notes,
    }).returning();
};

export const getLeaderboard = async () => {
    const allGames = await getAllGames();

    const stats: Record<number, { name: string; wins: number; losses: number; games: number }> = {};

    for (const game of allGames) {
        const { player1Id, player2Id, player1, player2, player1Faction, player2Faction, result } = game;
        if (!player1Id || !player2Id || !player1 || !player2) continue;

        const resultLower = result.toLowerCase();

        // Init players if not exists
        if (!stats[player1Id]) stats[player1Id] = { name: player1, wins: 0, losses: 0, games: 0 };
        if (!stats[player2Id]) stats[player2Id] = { name: player2, wins: 0, losses: 0, games: 0 };

        stats[player1Id].games++;
        stats[player2Id].games++;

        // Check who won by matching faction or player name in result
        const p1Won = resultLower.includes(player1.toLowerCase()) ||
            (player1Faction && resultLower.includes(player1Faction.toLowerCase()));
        const p2Won = resultLower.includes(player2.toLowerCase()) ||
            (player2Faction && resultLower.includes(player2Faction.toLowerCase()));

        if (p1Won && !p2Won) {
            stats[player1Id].wins++;
            stats[player2Id].losses++;
        } else if (p2Won && !p1Won) {
            stats[player2Id].wins++;
            stats[player1Id].losses++;
        }
    }

    return Object.values(stats)
        .map((s) => ({
            player: s.name,
            wins: s.wins,
            losses: s.losses,
            games: s.games,
            winRate: s.games > 0 ? Math.round((s.wins / s.games) * 100) : 0
        }))
        .sort((a, b) => b.wins - a.wins || b.winRate - a.winRate);
}