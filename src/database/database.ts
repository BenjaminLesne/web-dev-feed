import { drizzle } from "drizzle-orm/libsql/node";
import { env } from "../env.js";

export const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
  },
});
