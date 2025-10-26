import { Hono } from "hono";
import { getGames, postGame } from "../controllers/games.controller";

const router = new Hono();

router.get("/", getGames);
router.post("/", postGame);

export default router;