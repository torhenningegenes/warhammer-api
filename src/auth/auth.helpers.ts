import { createToken } from "./jwt.ts";

export const createAuthToken = async (c) => {
  if (!c) {
    throw new Error("Context 'c' is required");
  }

  const { password } = await c.req.json();

  if (password !== Deno.env.get("ADMIN_PASSWORD")) {
    return c.json({
      error: "Unauthorized cogitation attempt detected. Recalibration required",
    }, 401);
  }

  const token = await createToken({ sub: "admin", role: "admin" });
  return c.json({ token: `${token}` });
};
