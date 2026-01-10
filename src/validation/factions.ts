import { z } from "@hono/zod-openapi";

export const factionSchema = z.object({
    name: z.string().min(1).openapi({ example: "Space Marines" }),
    allegiance: z.enum(["imperium", "chaos", "xenos"]).openapi({ example: "imperium" }),
}).openapi("FactionInput");

export const factionResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    allegiance: z.enum(["imperium", "chaos", "xenos"]),
    createdAt: z.string().nullable(),
}).openapi("Faction");

export type FactionInput = z.infer<typeof factionSchema>;
