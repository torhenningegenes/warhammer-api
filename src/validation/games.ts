import { z } from "@hono/zod-openapi";

export const gameSchema = z.object({
    player1Id: z.number().openapi({ example: 1, description: "Player 1 ID" }),
    player2Id: z.number().openapi({ example: 2, description: "Player 2 ID" }),
    player1FactionId: z.number().optional().openapi({ example: 1, description: "Player 1 faction ID" }),
    player2FactionId: z.number().optional().openapi({ example: 2, description: "Player 2 faction ID" }),
    result: z.string().min(1).openapi({ example: "Player 1 wins" }),
    mission: z.string().optional().openapi({ example: "Scorched Earth" }),
    armyPoints: z.string().optional().openapi({ example: "2000" }),
    notes: z.string().optional().openapi({ example: "Close game" }),
}).openapi("GameInput");

export const gameResponseSchema = z.object({
    id: z.number(),
    player1: z.string().nullable(),
    player2: z.string().nullable(),
    player1Id: z.number().nullable(),
    player2Id: z.number().nullable(),
    player1Faction: z.string().nullable(),
    player2Faction: z.string().nullable(),
    player1FactionId: z.number().nullable(),
    player2FactionId: z.number().nullable(),
    result: z.string(),
    mission: z.string().nullable(),
    armyPoints: z.string().nullable(),
    notes: z.string().nullable(),
    createdAt: z.string().nullable(),
}).openapi("Game");

export const leaderboardEntrySchema = z.object({
    player: z.string(),
    wins: z.number(),
}).openapi("LeaderboardEntry");

export type GameInput = z.infer<typeof gameSchema>;