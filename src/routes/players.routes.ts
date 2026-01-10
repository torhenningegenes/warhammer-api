import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { getPlayers, getPlayer, postPlayer, putPlayer, removePlayer } from "../controllers/players.controller";
import { playerSchema, playerResponseSchema } from "../validation/player";

const router = new OpenAPIHono();

// GET /players
const getPlayersRoute = createRoute({
    method: "get",
    path: "/",
    tags: ["Players"],
    security: [{ Bearer: [] }],
    responses: {
        200: {
            description: "List of all players",
            content: {
                "application/json": {
                    schema: z.object({
                        players: z.array(playerResponseSchema),
                    }),
                },
            },
        },
    },
});

// GET /players/:id
const getPlayerRoute = createRoute({
    method: "get",
    path: "/{id}",
    tags: ["Players"],
    security: [{ Bearer: [] }],
    request: {
        params: z.object({
            id: z.string().openapi({ example: "1" }),
        }),
    },
    responses: {
        200: {
            description: "Player details",
            content: {
                "application/json": {
                    schema: z.object({
                        player: playerResponseSchema,
                    }),
                },
            },
        },
        404: {
            description: "Player not found",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() }),
                },
            },
        },
    },
});

// POST /players
const postPlayerRoute = createRoute({
    method: "post",
    path: "/",
    tags: ["Players"],
    security: [{ Bearer: [] }],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: playerSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: "Created player",
            content: {
                "application/json": {
                    schema: z.object({
                        player: playerResponseSchema,
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

// PUT /players/:id
const putPlayerRoute = createRoute({
    method: "put",
    path: "/{id}",
    tags: ["Players"],
    security: [{ Bearer: [] }],
    request: {
        params: z.object({
            id: z.string().openapi({ example: "1" }),
        }),
        body: {
            content: {
                "application/json": {
                    schema: playerSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Updated player",
            content: {
                "application/json": {
                    schema: z.object({
                        player: playerResponseSchema,
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
        404: {
            description: "Player not found",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() }),
                },
            },
        },
    },
});

// DELETE /players/:id
const deletePlayerRoute = createRoute({
    method: "delete",
    path: "/{id}",
    tags: ["Players"],
    security: [{ Bearer: [] }],
    request: {
        params: z.object({
            id: z.string().openapi({ example: "1" }),
        }),
    },
    responses: {
        200: {
            description: "Player deleted (soft delete)",
            content: {
                "application/json": {
                    schema: z.object({ message: z.string() }),
                },
            },
        },
        404: {
            description: "Player not found",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() }),
                },
            },
        },
    },
});

router.openapi(getPlayersRoute, getPlayers as any);
router.openapi(getPlayerRoute, getPlayer as any);
router.openapi(postPlayerRoute, postPlayer as any);
router.openapi(putPlayerRoute, putPlayer as any);
router.openapi(deletePlayerRoute, removePlayer as any);

export default router;
