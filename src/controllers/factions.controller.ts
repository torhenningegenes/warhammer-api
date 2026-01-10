import { Context } from "hono";
import { getAllFactions, getFactionById, createFaction, updateFaction, deleteFaction } from "../services/factions.service";
import { factionSchema } from "../validation/factions";

export const getFactions = async (c: Context) => {
    const allFactions = await getAllFactions();
    return c.json({ factions: allFactions });
};

export const getFaction = async (c: Context) => {
    const id = Number(c.req.param("id"));
    const faction = await getFactionById(id);

    if (!faction) {
        return c.json({ error: "Faction not found" }, 404);
    }
    return c.json({ faction });
};

export const postFaction = async (c: Context) => {
    const json = await c.req.json();
    const parseResult = factionSchema.safeParse(json);

    if (!parseResult.success) {
        return c.json({ error: "Invalid input", details: parseResult.error }, 400);
    }

    const result = await createFaction(parseResult.data);
    return c.json({ faction: result[0] }, 201);
};

export const putFaction = async (c: Context) => {
    const id = Number(c.req.param("id"));
    const json = await c.req.json();
    const parseResult = factionSchema.safeParse(json);

    if (!parseResult.success) {
        return c.json({ error: "Invalid input", details: parseResult.error }, 400);
    }

    const result = await updateFaction(id, parseResult.data);
    if (result.length === 0) {
        return c.json({ error: "Faction not found" }, 404);
    }
    return c.json({ faction: result[0] });
};

export const removeFaction = async (c: Context) => {
    const id = Number(c.req.param("id"));
    const result = await deleteFaction(id);

    if (result.length === 0) {
        return c.json({ error: "Faction not found" }, 404);
    }
    return c.json({ message: "Faction deleted" });
};
