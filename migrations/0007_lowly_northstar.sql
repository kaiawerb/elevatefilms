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
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "gear_equipments_id_unique" UNIQUE("id"),
	CONSTRAINT "gear_equipments_serial_number_unique" UNIQUE("serial_number")
);
