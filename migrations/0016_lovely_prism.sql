ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'client';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "rg" varchar(20);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "civil_status" varchar(50);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profession" varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "street" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "number" varchar(20);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "complement" varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "neighborhood" varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "zip_code" varchar(20);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "city" varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "state" varchar(50);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "document_photo_url" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "creci" varchar(20);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "language" varchar(5) DEFAULT 'pt-BR';--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "address";--> statement-breakpoint
ALTER TABLE "public"."users" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."role";--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'client', 'owner', 'broker', 'employee');--> statement-breakpoint
ALTER TABLE "public"."users" ALTER COLUMN "role" SET DATA TYPE "public"."role" USING "role"::"public"."role";