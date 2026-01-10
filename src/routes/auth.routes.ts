import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { createAuthToken } from "../controllers/auth.controller";

const router = new OpenAPIHono();

const authRoute = createRoute({
    method: "post",
    path: "/",
    tags: ["Auth"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: z.object({
                        password: z.string().openapi({ example: "your-admin-password" }),
                    }),
                },
            },
        },
    },
    responses: {
        200: {
            description: "JWT token",
            content: {
                "application/json": {
                    schema: z.object({
                        token: z.string(),
                    }),
                },
            },
        },
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: z.object({
                        error: z.string(),
                    }),
                },
            },
        },
    },
});

router.openapi(authRoute, createAuthToken as any);

export default router;