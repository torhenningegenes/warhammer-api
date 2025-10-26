import { Context } from "hono";
import { getAllGames, createGame } from "../services/games.service";
import { gameSchema } from "../validation/games";

export const getGames = async (c: Context) => {
    const user = c.get("jwtPayload");
    const allGames = await getAllGames();

    return c.json({
        games: allGames,
        user: `${user?.sub} with role ${user?.role}`,
    });
};

export const postGame = async (c: Context) => {
    const json = await c.req.json();
    const parseResult = gameSchema.safeParse(json);

    if (!parseResult.success) {
        return c.json({ error: "Invalid input", details: parseResult.error }, 400);
    }

    const result = await createGame(parseResult.data);
    return c.json({ game: result });
};