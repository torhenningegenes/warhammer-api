import { Hono } from "hono";
import { createAuthToken } from "../controllers/auth.controller";

const router = new Hono();

router.post("/", createAuthToken);

export default router;