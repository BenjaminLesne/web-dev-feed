import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const postsTable = sqliteTable('posts', {
  id: int().primaryKey({ autoIncrement: true }),
  uri: text().notNull().unique(),
  interestScore: int().notNull(),
  createdAt: int({ mode: 'timestamp' }),
})
