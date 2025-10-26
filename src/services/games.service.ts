import { db } from "../db/client";
import { games } from "../db/schema";
import {GameInput} from "../validation/games";

export const getAllGames = async () => {
    return db.select().from(games);
};

export const createGame = async (data: GameInput) => {
    return db.insert(games).values(data).returning();
};