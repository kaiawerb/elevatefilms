CREATE TYPE "public"."role" AS ENUM('ADMIN', 'CLIENT', 'OWNER', 'BROKER', 'EMPLOYEE');--> statement-breakpoint
CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"genre" text NOT NULL,
	"rating" integer NOT NULL,
	"cover_url" text NOT NULL,
	"cover_color" varchar(7) NOT NULL,
	"download_url" varchar NOT NULL,
	"description" text NOT NULL,
	"total_copies" integer DEFAULT 1 NOT NULL,
	"available_copies" integer DEFAULT 0 NOT NULL,
	"video_url" text NOT NULL,
	"summary" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "books_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" text,
	"cnpj" varchar(18),
	"address" text,
	"phone" varchar(15),
	"created_at" timestamp with time zone DEFAULT now(),
	"image" text DEFAULT '/user/profileImage/profileUrlPlaceHolder.png',
	CONSTRAINT "companies_id_unique" UNIQUE("id"),
	CONSTRAINT "companies_email_unique" UNIQUE("email"),
	CONSTRAINT "companies_cnpj_unique" UNIQUE("cnpj")
);
--> statement-breakpoint
CREATE TABLE "company_responsibles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid,
	"user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "company_responsibles_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "gear_equipments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" varchar(50) NOT NULL,
	"brand" varchar(255) NOT NULL,
	"model" varchar(255) NOT NULL,
	"serial_number" varchar(255) NOT NULL,
	"purchase_date" timestamp with time zone NOT NULL,
	"purchase_value" varchar(20) NOT NULL,
	"status" varchar(50) DEFAULT 'AVAILABLE' NOT NULL,
	"notes" text,
	"cover_url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"company_id" uuid,
	CONSTRAINT "gear_equipments_id_unique" UNIQUE("id"),
	CONSTRAINT "gear_equipments_serial_number_unique" UNIQUE("serial_number")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"age" integer,
	"genre" varchar(50),
	"civil_status" varchar(50),
	"profession" varchar(100),
	"phone" varchar(15),
	"cpf" varchar(14),
	"rg" varchar(20),
	"document_photo_url" text,
	"creci" varchar(20),
	"street" varchar(255),
	"complement" varchar(100),
	"neighborhood" varchar(100),
	"zip_code" varchar(20),
	"city" varchar(100),
	"state" varchar(50),
	"notes" text,
	"image" text DEFAULT '/user/profileImage/profileUrlPlaceHolder.png',
	"last_activity_date" date DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	"role" "role" DEFAULT 'CLIENT',
	"company_id" uuid,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_cpf_unique" UNIQUE("cpf")
);
--> statement-breakpoint
ALTER TABLE "company_responsibles" ADD CONSTRAINT "company_responsibles_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "company_responsibles" ADD CONSTRAINT "company_responsibles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gear_equipments" ADD CONSTRAINT "gear_equipments_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;