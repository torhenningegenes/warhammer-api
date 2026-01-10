import 'dotenv/config';
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { jwt } from "hono/jwt";
import { logger } from 'hono/logger'
import { serve } from "@hono/node-server";
import authRoutes from "./routes/auth.routes";
import gamesRoutes from "./routes/games.routes";
import factionsRoutes from "./routes/factions.routes";
import playersRoutes from "./routes/players.routes";

const app = new OpenAPIHono();
app.use(logger())

// Apply JWT auth to protected routes
app.use(
    "/games/*",
    jwt({
        secret: process.env.JWT_SECRET_KEY!,
    }),
);
app.use(
    "/factions/*",
    jwt({
        secret: process.env.JWT_SECRET_KEY!,
    }),
);
app.use(
    "/players/*",
    jwt({
        secret: process.env.JWT_SECRET_KEY!,
    }),
);

// Public routes
app.get("/", (c) => c.text("In the grim darkness of the far future, there is only war."));
app.get("/about", (c) => c.json({ message: "About Page" }));

// Mount routes
app.route("/auth", authRoutes);
app.route("/games", gamesRoutes);
app.route("/factions", factionsRoutes);
app.route("/players", playersRoutes);

// OpenAPI spec
app.doc("/doc", {
    openapi: "3.0.0",
    info: {
        title: "Warhammer Game Tracker API",
        version: "1.0.0",
        description: "API for tracking Warhammer games",
    },
    security: [{ Bearer: [] }],
});

// Register security scheme
app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
});

// Swagger UI
app.get("/docs", swaggerUI({ url: "/doc" }));

serve({
    fetch: app.fetch,
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
});

console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
console.log(`Swagger UI: http://localhost:${process.env.PORT || 3000}/docs`);
