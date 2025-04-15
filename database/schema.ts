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

export const ROLE_ENUM = pgEnum("role", [
  "ADMIN", // Acesso total ao sistema, gerencia tudo
  "CLIENT", // Usuário final, comprador ou locatário
  "OWNER", // Proprietário de imóvel
  "BROKER", // Corretor
  "EMPLOYEE", // Funcionário interno ou suporte (opcional)
])

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullname: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),

  age: integer("age"),
  genre: varchar("genre", { length: 50 }),

  civilStatus: varchar("civil_status", { length: 50 }),
  profession: varchar("profession", { length: 100 }),
  phone: varchar("phone", { length: 15 }),

  cpf: varchar("cpf", { length: 14 }).unique(),
  rg: varchar("rg", { length: 20 }),
  documentPhoto: text("document_photo_url"),
  creci: varchar("creci", { length: 20 }),

  street: varchar("street", { length: 255 }),
  complement: varchar("complement", { length: 100 }),
  neighborhood: varchar("neighborhood", { length: 100 }),
  zipCode: varchar("zip_code", { length: 20 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }),

  notes: text("notes"),

  image: text("image").default("/user/profileImage/profileUrlPlaceHolder.png"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  role: ROLE_ENUM("role").default("CLIENT"),

  companyId: uuid("company_id").references(() => companies.id),
})

export const companies = pgTable("companies", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),

  name: varchar("name", { length: 255 }).notNull(),
  email: text("email").unique(),

  cnpj: varchar("cnpj", { length: 18 }).unique(),
  phone: varchar("phone", { length: 15 }),

  street: varchar("street", { length: 255 }),
  complement: varchar("complement", { length: 100 }),
  neighborhood: varchar("neighborhood", { length: 100 }),
  zipCode: varchar("zip_code", { length: 20 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  image: text("image").default("/gear/covers/gearCoverPlaceHolder.png"),
  notes: text("notes"),
})

export const companyResponsibles = pgTable("company_responsibles", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),

  companyId: uuid("company_id").references(() => companies.id, {
    onDelete: "cascade",
  }),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
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
  brand: varchar("brand", { length: 255 }).notNull(),
  model: varchar("model", { length: 255 }).notNull(),

  type: varchar("type", { length: 50 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("AVAILABLE"),

  purchaseDate: timestamp("purchase_date", { withTimezone: true }).notNull(),
  purchaseValue: varchar("purchase_value", { length: 20 }).notNull(),
  serialNumber: varchar("serial_number", { length: 255 }).unique(),

  coverUrl: text("cover_url").notNull(),
  notes: text("notes"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  companyId: uuid("company_id").references(() => companies.id),
})

export const propertyCoordinates = pgTable("property_coordinates", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("name"),
  propertyId: uuid("property_id"), // se o id do imóvel for UUID, ou integer se for integer
  companyId: uuid("company_id").references(() => companies.id),
  latitude: varchar("latitude").notNull(),
  longitude: varchar("longitude").notNull(),
})
