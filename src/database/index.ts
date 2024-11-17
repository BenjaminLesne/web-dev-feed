import { drizzle } from "drizzle-orm/libsql/node";
import { env } from "../env";

const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
    // authToken: process.env.DATABASE_AUTH_TOKEN,
  },
});
