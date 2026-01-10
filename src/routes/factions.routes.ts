import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { getFactions, getFaction, postFaction, putFaction, removeFaction } from "../controllers/factions.controller";
import { factionSchema, factionResponseSchema } from "../validation/factions";

const router = new OpenAPIHono();

// GET /factions
const getFactionsRoute = createRoute({
    method: "get",
    path: "/",
    tags: ["Factions"],
    security: [{ Bearer: [] }],
    responses: {
        200: {
            description: "List of all factions",
            content: {
                "application/json": {
                    schema: z.object({
                        factions: z.array(factionResponseSchema),
                    }),
                },
            },
        },
    },
});

// GET /factions/:id
const getFactionRoute = createRoute({
    method: "get",
    path: "/{id}",
    tags: ["Factions"],
    security: [{ Bearer: [] }],
    request: {
        params: z.object({
            id: z.string().openapi({ example: "1" }),
        }),
    },
    responses: {
        200: {
            description: "Faction details",
            content: {
                "application/json": {
                    schema: z.object({
                        faction: factionResponseSchema,
                    }),
                },
            },
        },
        404: {
            description: "Faction not found",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() }),
                },
            },
        },
    },
});

// POST /factions
const postFactionRoute = createRoute({
    method: "post",
    path: "/",
    tags: ["Factions"],
    security: [{ Bearer: [] }],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: factionSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: "Created faction",
            content: {
                "application/json": {
                    schema: z.object({
                        faction: factionResponseSchema,
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

// PUT /factions/:id
const putFactionRoute = createRoute({
    method: "put",
    path: "/{id}",
    tags: ["Factions"],
    security: [{ Bearer: [] }],
    request: {
        params: z.object({
            id: z.string().openapi({ example: "1" }),
        }),
        body: {
            content: {
                "application/json": {
                    schema: factionSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Updated faction",
            content: {
                "application/json": {
                    schema: z.object({
                        faction: factionResponseSchema,
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
            description: "Faction not found",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() }),
                },
            },
        },
    },
});

// DELETE /factions/:id
const deleteFactionRoute = createRoute({
    method: "delete",
    path: "/{id}",
    tags: ["Factions"],
    security: [{ Bearer: [] }],
    request: {
        params: z.object({
            id: z.string().openapi({ example: "1" }),
        }),
    },
    responses: {
        200: {
            description: "Faction deleted",
            content: {
                "application/json": {
                    schema: z.object({ message: z.string() }),
                },
            },
        },
        404: {
            description: "Faction not found",
            content: {
                "application/json": {
                    schema: z.object({ error: z.string() }),
                },
            },
        },
    },
});

router.openapi(getFactionsRoute, getFactions as any);
router.openapi(getFactionRoute, getFaction as any);
router.openapi(postFactionRoute, postFaction as any);
router.openapi(putFactionRoute, putFaction as any);
router.openapi(deleteFactionRoute, removeFaction as any);

export default router;
