import 'dotenv/config';
import { db } from "./client";
import { games, players, factions } from "./schema";
import { eq, ilike } from "drizzle-orm";

async function migrate() {
    console.log("Migrating games to FK references...");

    const allGames = await db.select().from(games);
    console.log(`Found ${allGames.length} games to migrate`);

    let updated = 0;
    let playersCreated = 0;

    for (const game of allGames) {
        const updates: {
            player1Id?: number;
            player2Id?: number;
            player1FactionId?: number;
            player2FactionId?: number;
        } = {};

        // Lookup/create player1
        let [p1] = await db.select().from(players).where(ilike(players.name, game.player1));
        if (!p1) {
            [p1] = await db.insert(players).values({ name: game.player1 }).returning();
            playersCreated++;
            console.log(`Created player: ${game.player1}`);
        }
        updates.player1Id = p1.id;

        // Lookup/create player2
        let [p2] = await db.select().from(players).where(ilike(players.name, game.player2));
        if (!p2) {
            [p2] = await db.insert(players).values({ name: game.player2 }).returning();
            playersCreated++;
            console.log(`Created player: ${game.player2}`);
        }
        updates.player2Id = p2.id;

        // Lookup faction1 (if exists)
        if (game.player1Faction) {
            const [f1] = await db.select().from(factions).where(ilike(factions.name, game.player1Faction));
            if (f1) {
                updates.player1FactionId = f1.id;
            } else {
                console.warn(`Faction not found: ${game.player1Faction}`);
            }
        }

        // Lookup faction2 (if exists)
        if (game.player2Faction) {
            const [f2] = await db.select().from(factions).where(ilike(factions.name, game.player2Faction));
            if (f2) {
                updates.player2FactionId = f2.id;
            } else {
                console.warn(`Faction not found: ${game.player2Faction}`);
            }
        }

        await db.update(games).set(updates).where(eq(games.id, game.id));
        updated++;
    }

    console.log(`Migration complete: ${updated} games updated, ${playersCreated} players created`);
    process.exit(0);
}

migrate().catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
});
