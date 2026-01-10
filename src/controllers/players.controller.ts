import { Context } from "hono";
import { getAllPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer } from "../services/players.service";
import { playerSchema } from "../validation/player";

export const getPlayers = async (c: Context) => {
    const allPlayers = await getAllPlayers();
    return c.json({ players: allPlayers });
};

export const getPlayer = async (c: Context) => {
    const id = Number(c.req.param("id"));
    const player = await getPlayerById(id);

    if (!player) {
        return c.json({ error: "Player not found" }, 404);
    }
    return c.json({ player });
};

export const postPlayer = async (c: Context) => {
    const json = await c.req.json();
    const parseResult = playerSchema.safeParse(json);

    if (!parseResult.success) {
        return c.json({ error: "Invalid input", details: parseResult.error }, 400);
    }

    const result = await createPlayer(parseResult.data);
    return c.json({ player: result }, 201);
};

export const putPlayer = async (c: Context) => {
    const id = Number(c.req.param("id"));
    const json = await c.req.json();
    const parseResult = playerSchema.safeParse(json);

    if (!parseResult.success) {
        return c.json({ error: "Invalid input", details: parseResult.error }, 400);
    }

    const result = await updatePlayer(id, parseResult.data);
    if (!result) {
        return c.json({ error: "Player not found" }, 404);
    }
    return c.json({ player: result });
};

export const removePlayer = async (c: Context) => {
    const id = Number(c.req.param("id"));
    const result = await deletePlayer(id);

    if (!result) {
        return c.json({ error: "Player not found" }, 404);
    }
    return c.json({ message: "Player deleted" });
};
