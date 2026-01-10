import { z } from "@hono/zod-openapi";

export const playerSchema = z.object({
    name: z.string().min(1).openapi({ example: "John" }),
    factionIds: z.array(z.number()).optional().openapi({ example: [1, 2] }),
    notes: z.string().optional().openapi({ example: "Prefers aggressive playstyle" }),
}).openapi("PlayerInput");

export const playerResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    notes: z.string().nullable(),
    factions: z.array(z.object({
        id: z.number(),
        name: z.string(),
        allegiance: z.enum(["imperium", "chaos", "xenos"]),
    })).optional(),
    createdAt: z.string().nullable(),
}).openapi("Player");

export type PlayerInput = z.infer<typeof playerSchema>;
