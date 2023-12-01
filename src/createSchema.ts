import { sql } from "./config/database/connection";

async function createTables() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
  await sql`CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    is_verified BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
    );`;
  await sql`CREATE TABLE IF NOT EXISTS collections (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        user_id UUID NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`;
  await sql`CREATE TABLE IF NOT EXISTS columns (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        collection_id UUID NOT NULL,
        ordering INTEGER NOT NULL,
        enabled BOOLEAN NOT NULL DEFAULT true,
        UNIQUE (name,collection_id),
        FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE
    );`;
  await sql`CREATE TABLE IF NOT EXISTS coins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collection_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE
    );`;
  await sql`CREATE TABLE IF NOT EXISTS coins_values (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        value TEXT NOT NULL,
        coin_id UUID NOT NULL,
        column_id UUID NOT NULL,
        FOREIGN KEY (coin_id) REFERENCES coins(id) ON DELETE CASCADE,
        FOREIGN KEY (column_id) REFERENCES columns(id) ON DELETE CASCADE,
        UNIQUE (coin_id,column_id)
    );`;
}
createTables().then(() => {
  console.log("Tables created");
  process.exit();
});
