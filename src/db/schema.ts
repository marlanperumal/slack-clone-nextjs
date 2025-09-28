import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const channels = sqliteTable("channels", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});
