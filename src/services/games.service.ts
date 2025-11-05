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
    // Placeholder for leaderboard logic
    const leaderboardData = await db.select().from(games); // This would be fetched from a service or database
    return leaderboardData;
}