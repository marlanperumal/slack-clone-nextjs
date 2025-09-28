import { createClient } from '@libsql/client/node';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';

const client = createClient({
  url: process.env.DB_FILE_NAME ?? 'file:database.db',
});

export const db = drizzle(client);