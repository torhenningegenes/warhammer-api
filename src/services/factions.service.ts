import { db } from "../db/client";
import { factions } from "../db/schema/factions";
import { eq } from "drizzle-orm";
import { FactionInput } from "../validation/factions";

export const getAllFactions = async () => {
    return db.select().from(factions);
};

export const getFactionById = async (id: number) => {
    const result = await db.select().from(factions).where(eq(factions.id, id));
    return result[0] || null;
};

export const createFaction = async (data: FactionInput) => {
    return db.insert(factions).values(data).returning();
};

export const updateFaction = async (id: number, data: FactionInput) => {
    return db.update(factions).set(data).where(eq(factions.id, id)).returning();
};

export const deleteFaction = async (id: number) => {
    return db.delete(factions).where(eq(factions.id, id)).returning();
};
