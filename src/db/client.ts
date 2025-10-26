// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
//
//
// const connectionString = process.env.DATABASE_URL!;
// if (!connectionString) throw new Error("DATABASE_URL not set");
//
// const client = postgres(connectionString);
// export const db = drizzle(client);

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);