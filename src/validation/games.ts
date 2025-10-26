import { z } from "zod";

export const gameSchema = z.object({
    player1: z.string().min(1),
    player2: z.string().min(1),
    result: z.string().min(1),
    mission: z.string().optional(),
    armyPoints: z.string().optional(),
    notes: z.string().optional(),
});

export type GameInput = z.infer<typeof gameSchema>;