import { db } from "../db/client";
import { games } from "../db/schema";
import {GameInput} from "../validation/games";

export const getAllGames = async () => {
    return db.select().from(games);
};

export const createGame = async (data: GameInput) => {
    return db.insert(games).values(data).returning();
};

export const getLeaderboard = async () => {
    const allGames = await db.select().from(games);

    const stats: Record<string, { wins: number; losses: number; games: number }> = {};

    for (const game of allGames) {
        const { player1, player2, player1Faction, player2Faction, result } = game;
        const resultLower = result.toLowerCase();

        // Init players if not exists
        if (!stats[player1]) stats[player1] = { wins: 0, losses: 0, games: 0 };
        if (!stats[player2]) stats[player2] = { wins: 0, losses: 0, games: 0 };

        stats[player1].games++;
        stats[player2].games++;

        // Check who won by matching faction or player name in result
        const p1Won = resultLower.includes(player1.toLowerCase()) ||
            (player1Faction && resultLower.includes(player1Faction.toLowerCase()));
        const p2Won = resultLower.includes(player2.toLowerCase()) ||
            (player2Faction && resultLower.includes(player2Faction.toLowerCase()));

        if (p1Won && !p2Won) {
            stats[player1].wins++;
            stats[player2].losses++;
        } else if (p2Won && !p1Won) {
            stats[player2].wins++;
            stats[player1].losses++;
        }
        // If both or neither match, counts as indeterminate (no win/loss recorded)
    }

    // Convert to sorted array
    return Object.entries(stats)
        .map(([player, s]) => ({
            player,
            wins: s.wins,
            losses: s.losses,
            games: s.games,
            winRate: s.games > 0 ? Math.round((s.wins / s.games) * 100) : 0
        }))
        .sort((a, b) => b.wins - a.wins || b.winRate - a.winRate);
}