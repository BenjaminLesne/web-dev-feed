import { defineConfig } from "drizzle-kit";
import { env } from "./src/env";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/schemas.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
