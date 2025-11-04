import { z } from "zod";

export const playerSchema = z.object({
    name: z.string().min(1),
    faction: z.string().min(1),
    notes: z.string().optional(),
});

export type PlayerInput = z.infer<typeof playerSchema>;