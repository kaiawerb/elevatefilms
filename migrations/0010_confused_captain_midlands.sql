ALTER TABLE "users" ADD COLUMN "image" text DEFAULT '/user/profileImage/profileUrlPlaceHolder.png';--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "profile_url";