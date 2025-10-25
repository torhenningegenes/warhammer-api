import { Hono } from "hono";
import { token } from "./auth/auth.ts";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/about", (c) => {
  return c.json({ message: "About Page" });
});

app.get("/ping", (c) => {
  return c.json({ replay: "Pong", token: `${token}` });
});

Deno.serve(app.fetch);
