CREATE TABLE "players" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	CONSTRAINT "players_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "player_factions" (
	"player_id" integer NOT NULL,
	"faction_id" integer NOT NULL,
	CONSTRAINT "player_factions_player_id_faction_id_pk" PRIMARY KEY("player_id","faction_id")
);
--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "player1_id" integer;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "player2_id" integer;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "player1_faction_id" integer;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "player2_faction_id" integer;--> statement-breakpoint
ALTER TABLE "player_factions" ADD CONSTRAINT "player_factions_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_factions" ADD CONSTRAINT "player_factions_faction_id_factions_id_fk" FOREIGN KEY ("faction_id") REFERENCES "public"."factions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_player1_id_players_id_fk" FOREIGN KEY ("player1_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_player2_id_players_id_fk" FOREIGN KEY ("player2_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_player1_faction_id_factions_id_fk" FOREIGN KEY ("player1_faction_id") REFERENCES "public"."factions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_player2_faction_id_factions_id_fk" FOREIGN KEY ("player2_faction_id") REFERENCES "public"."factions"("id") ON DELETE no action ON UPDATE no action;