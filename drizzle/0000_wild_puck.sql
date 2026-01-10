CREATE TYPE "public"."allegiance" AS ENUM('imperium', 'chaos', 'xenos');--> statement-breakpoint
CREATE TABLE "factions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"allegiance" "allegiance" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "factions_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "games" (
	"id" serial PRIMARY KEY NOT NULL,
	"player1" text NOT NULL,
	"player2" text NOT NULL,
	"player1_faction" text,
	"player2_faction" text,
	"result" text NOT NULL,
	"mission" text,
	"army_points" text,
	"notes" text,
	"created_at" timestamp DEFAULT now()
);
