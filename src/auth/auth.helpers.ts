import { createToken } from "./jwt";
import {Context} from "hono";

export const createAuthToken = async (c:  Context) => {
  if (!c) {
    throw new Error("Context 'c' is required");
  }

  const { password } = await c.req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return c.json({
      error: "Unauthorized cogitation attempt detected. Recalibration required",
    }, 401);
  }

  const token = await createToken({ sub: "admin", role: "admin" });
  return c.json({ token: `${token}` });
};
