import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './src/database/schemas.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
})