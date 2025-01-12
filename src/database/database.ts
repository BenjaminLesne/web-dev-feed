import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const client = createClient({
  url: process.env.DATABASE_URL as string,
});

await client.execute('PRAGMA journal_mode = WAL');

export const db = drizzle(client);
