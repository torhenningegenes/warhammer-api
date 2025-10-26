import { createToken } from "../services/auth.service";
import { Context } from "hono";
import 'dotenv/config';

export const createAuthToken = async (c: Context) => {
    const { password } = await c.req.json();

    if (password !== process.env.ADMIN_PASSWORD) {
        return c.json({ error: "Unauthorized cogitation attempt detected. Recalibration required" }, 401);
    }

    const token = await createToken({ sub: "admin", role: "admin" });
    return c.json({ token });
};