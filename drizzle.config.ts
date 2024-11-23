import { defineConfig } from "drizzle-kit";
import { env } from "./src/env.js";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/schemas.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
