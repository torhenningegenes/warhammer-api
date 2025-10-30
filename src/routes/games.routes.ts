import { Hono } from "hono";
import { getGames, postGame } from "../controllers/games.controller";

const router = new Hono();

router.get("/", getGames);
router.post("/", postGame);
roter.get("/", getLeaderboard);

export default router;