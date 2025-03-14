import {
  integer,
  text,
  boolean,
  pgTable,
  uuid,
  pgEnum,
  date,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core"

export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"])

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  image: text("image").default("/user/profileImage/profileUrlPlaceHolder.png"),
  fullname: varchar("full_name", { length: 255 }).notNull(),
  age: integer("age"),
  genre: varchar("genre", { length: 50 }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: ROLE_ENUM("role").default("USER"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  cpf: varchar("cpf", { length: 14 }).unique(),
  phone: varchar("phone", { length: 15 }),
  address: text("address"),
  companyId: uuid("company_id").references(() => companies.id, {
    onDelete: "cascade",
  }),
  notes: text("notes"),
})

export const companies = pgTable("companies", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("name", { length: 255 }).notNull(), // Nome da empresa
  cnpj: varchar("cnpj", { length: 18 }).unique(), // CNPJ com máscara (ex.: 00.000.000/0000-00)
  address: text("address"), // Endereço da empresa
  phone: varchar("phone", { length: 15 }), // Telefone da empresa
  email: text("email").unique(), // E-mail da empresa
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

export const books = pgTable("books", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  genre: text("genre").notNull(),
  rating: integer("rating").notNull(),
  coverUrl: text("cover_url").notNull(),
  coverColor: varchar("cover_color", { length: 7 }).notNull(),
  downloadUrl: varchar("download_url").notNull(),
  description: text("description").notNull(),
  totalCopies: integer("total_copies").notNull().default(1),
  availableCopies: integer("available_copies").notNull().default(0),
  videoUrl: text("video_url").notNull(),
  summary: varchar("summary").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

export const gears = pgTable("gear_equipments", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  brand: varchar("brand", { length: 255 }).notNull(),
  model: varchar("model", { length: 255 }).notNull(),
  serialNumber: varchar("serial_number", { length: 255 }).notNull().unique(),
  purchaseDate: timestamp("purchase_date", { withTimezone: true }).notNull(),
  purchaseValue: varchar("purchase_value", { length: 20 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("AVAILABLE"),
  notes: text("notes"),
  coverUrl: text("cover_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  companyId: uuid("company_id").references(() => companies.id),
})
