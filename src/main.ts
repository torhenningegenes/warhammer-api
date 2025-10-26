import 'dotenv/config';
import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { logger } from 'hono/logger'
import {createAuthToken} from "./auth/auth.helpers";
import {serve} from "@hono/node-server";



const app = new Hono();
app.use(logger())

// Apply to all routes under /games (or globally if you want)
app.use(
    "/games/*",
    jwt({
        secret: process.env.JWT_SECRET_KEY!, // required
    }),
);

app.get("/", (c) => {
    return c.text("In the grim darkness of the far future, there is only war.");
});

app.get("/about", (c) => {
    return c.json({ message: "About Page" });
});

app.get("/games", (c) => {
    const user = c.get("jwtPayload"); // contains sub, role, exp etc.
    console.log('user:', user);
    return c.json({
        games: ["Game1 -  Victory Druhkari", "Game2 - Victory Imperial Fists"],
        user: `${user?.sub} with role ${user?.role}`,
    });
});

app.post("/auth", createAuthToken);

serve({
    fetch: app.fetch,
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
});

console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
