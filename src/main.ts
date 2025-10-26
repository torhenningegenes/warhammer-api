import 'dotenv/config';
import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { logger } from 'hono/logger'
import {createAuthToken} from "./auth/auth.helpers";
import {serve} from "@hono/node-server";
import {games} from "./db/schema/games";
import {db} from "./db/client";
import {gameSchema} from "./validation/games";
import authRoutes from "./routes/auth.routes";
import gamesRoutes from "./routes/games.routes";



const app = new Hono();
app.use(logger())

// Apply to all routes under /games (or globally if you want)
app.use(
    "/games/*",
    jwt({
        secret: process.env.JWT_SECRET_KEY!, // required
    }),
);

// Public routes
app.get("/", (c) => c.text("In the grim darkness of the far future, there is only war."));
app.get("/about", (c) => c.json({ message: "About Page" }));

// Mount routes
app.route("/auth", authRoutes);
app.route("/games", gamesRoutes);

app.get("/games", async (c) => {
    const user = c.get("jwtPayload"); // contains sub, role, exp etc.
    const allGames = await db.select().from(games);

    return c.json({
        games: allGames,
        user: `${user?.sub} with role ${user?.role}`,
    });
});



app.post("/games", async (c) => {
    const json = await c.req.json();
    const parseResult = gameSchema.safeParse(json);

    if (!parseResult.success) {
        return c.json({ error: "Invalid input", details: parseResult.error }, 400);
    }

    const result = await db.insert(games).values(parseResult.data).returning();
    return c.json({ game: result });
});



app.post("/auth", createAuthToken);

serve({
    fetch: app.fetch,
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
});

console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
