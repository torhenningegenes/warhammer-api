import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { getGames, postGame, getLeaderboard } from "../controllers/games.controller";
import { gameSchema, gameResponseSchema, leaderboardEntrySchema } from "../validation/games";

const router = new OpenAPIHono();

// GET /games
const getGamesRoute = createRoute({
    method: "get",
    path: "/",
    tags: ["Games"],
    security: [{ Bearer: [] }],
    responses: {
        200: {
            description: "List of all games",
            content: {
                "application/json": {
                    schema: z.object({
                        games: z.array(gameResponseSchema),
                        user: z.string(),
                    }),
                },
            },
        },
    },
});

// POST /games
const postGameRoute = createRoute({
    method: "post",
    path: "/",
    tags: ["Games"],
    security: [{ Bearer: [] }],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: gameSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Created game",
            content: {
                "application/json": {
                    schema: z.object({
                        game: gameResponseSchema,
                    }),
                },
            },
        },
        400: {
            description: "Validation error",
            content: {
                "application/json": {
                    schema: z.object({
                        error: z.string(),
                        details: z.any(),
                    }),
                },
            },
        },
    },
});

// GET /games/leaderboard
const getLeaderboardRoute = createRoute({
    method: "get",
    path: "/leaderboard",
    tags: ["Games"],
    security: [{ Bearer: [] }],
    responses: {
        200: {
            description: "Player leaderboard",
            content: {
                "application/json": {
                    schema: z.object({
                        leaderboard: z.array(leaderboardEntrySchema),
                    }),
                },
            },
        },
    },
});

router.openapi(getGamesRoute, getGames as any);
router.openapi(postGameRoute, postGame as any);
router.openapi(getLeaderboardRoute, getLeaderboard as any);

export default router;