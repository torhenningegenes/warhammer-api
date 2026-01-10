import { z } from "@hono/zod-openapi";

export const gameSchema = z.object({
    player1: z.string().min(1).openapi({ example: "John" }),
    player2: z.string().min(1).openapi({ example: "Jane" }),
    player1Faction: z.string().optional().openapi({ example: "Drukhari" }),
    player2Faction: z.string().optional().openapi({ example: "Space Marines" }),
    result: z.string().min(1).openapi({ example: "Player 1 wins" }),
    mission: z.string().optional().openapi({ example: "Scorched Earth" }),
    armyPoints: z.string().optional().openapi({ example: "2000" }),
    notes: z.string().optional().openapi({ example: "Close game" }),
}).openapi("GameInput");

export const gameResponseSchema = z.object({
    id: z.number(),
    player1: z.string(),
    player2: z.string(),
    player1Faction: z.string().nullable(),
    player2Faction: z.string().nullable(),
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