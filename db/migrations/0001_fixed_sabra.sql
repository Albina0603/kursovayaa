ALTER TABLE "todo" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "todo" DROP COLUMN IF EXISTS "user";