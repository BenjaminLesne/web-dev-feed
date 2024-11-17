import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("posts", {
  id: int().primaryKey({ autoIncrement: true }),
  uri: text().notNull().unique(),
  interestScore: int().notNull(),
});
