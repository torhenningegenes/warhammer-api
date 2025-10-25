import { decode, sign, verify } from "hono/jwt";

const payload = {
  sub: "user123",
  role: "admin",
  exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
};
const secret = Deno.env.get("JWT_SECRET_KEY");
export const token = await sign(payload, secret);
