import 'dotenv/config';
import { db } from "./client";
import { factions } from "./schema/factions";

const factionData: { name: string; allegiance: "imperium" | "chaos" | "xenos" }[] = [
    // Imperium
    { name: "Adepta Sororitas", allegiance: "imperium" },
    { name: "Adeptus Custodes", allegiance: "imperium" },
    { name: "Adeptus Mechanicus", allegiance: "imperium" },
    { name: "Astra Militarum", allegiance: "imperium" },
    { name: "Black Templars", allegiance: "imperium" },
    { name: "Blood Angels", allegiance: "imperium" },
    { name: "Dark Angels", allegiance: "imperium" },
    { name: "Deathwatch", allegiance: "imperium" },
    { name: "Grey Knights", allegiance: "imperium" },
    { name: "Imperial Fists", allegiance: "imperium" },
    { name: "Imperial Knights", allegiance: "imperium" },
    { name: "Iron Hands", allegiance: "imperium" },
    { name: "Raven Guard", allegiance: "imperium" },
    { name: "Salamanders", allegiance: "imperium" },
    { name: "Space Marines", allegiance: "imperium" },
    { name: "Space Wolves", allegiance: "imperium" },
    { name: "Ultramarines", allegiance: "imperium" },
    { name: "White Scars", allegiance: "imperium" },
    { name: "Imperial Agents", allegiance: "imperium" },

    // Chaos
    { name: "Chaos Daemons", allegiance: "chaos" },
    { name: "Chaos Knights", allegiance: "chaos" },
    { name: "Chaos Space Marines", allegiance: "chaos" },
    { name: "Death Guard", allegiance: "chaos" },
    { name: "Emperor's Children", allegiance: "chaos" },
    { name: "Thousand Sons", allegiance: "chaos" },
    { name: "World Eaters", allegiance: "chaos" },

    // Xenos
    { name: "Aeldari", allegiance: "xenos" },
    { name: "Drukhari", allegiance: "xenos" },
    { name: "Genestealer Cults", allegiance: "xenos" },
    { name: "Harlequins", allegiance: "xenos" },
    { name: "Leagues of Votann", allegiance: "xenos" },
    { name: "Necrons", allegiance: "xenos" },
    { name: "Orks", allegiance: "xenos" },
    { name: "T'au Empire", allegiance: "xenos" },
    { name: "Tyranids", allegiance: "xenos" },
    { name: "Ynnari", allegiance: "xenos" },
];

async function seed() {
    console.log("Seeding factions...");

    for (const faction of factionData) {
        await db.insert(factions).values(faction).onConflictDoNothing();
    }

    console.log(`Seeded ${factionData.length} factions`);
    process.exit(0);
}

seed().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});
