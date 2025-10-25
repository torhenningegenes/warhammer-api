import { Hono } from "hono";
import { createToken, verifyToken } from "./auth/jwt.ts";
import { createAuthToken } from "./auth/auth.helpers.ts";
import { jwt } from "hono/jwt";

const app = new Hono();

// Apply to all routes under /games (or globally if you want)
app.use(
  "/games/*",
  jwt({
    secret: Deno.env.get("JWT_SECRET_KEY")!, // required
  }),
);

app.get("/", (c) => {
  return c.text("In the grim darkness of the far future, there is only war.");
});

app.get("/about", (c) => {
  return c.json({ message: "About Page" });
});

app.get("/games", async (c) => {
  const user = c.get("jwtPayload"); // contains sub, role, exp etc.
console.log('user:', user);
  return c.json({
    games: ["Game1 -  Victory Druhkari", "Game2 - Victory Imperial Fists"],
    user: `${user?.sub} with role ${user?.role}`,
  });
});

app.post("/auth", createAuthToken);

Deno.serve(app.fetch);
