import { sql } from "./config/database/connection";

async function createTables() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
  await sql`CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    is_verified BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
    );`;
  await sql`CREATE TABLE tables (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        user_id UUID NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`;
  await sql`CREATE TABLE columns (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        table_id UUID NOT NULL,
        ordering INTEGER NOT NULL,
        enabled BOOLEAN NOT NULL DEFAULT true,
        UNIQUE (name,table_id),
        FOREIGN KEY (table_id) REFERENCES tables(id) ON DELETE CASCADE
    );`;
  await sql`CREATE TABLE rows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (table_id) REFERENCES tables(id) ON DELETE CASCADE
    );`;
  await sql`CREATE TABLE rows_values (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        value TEXT NOT NULL,
        row_id UUID NOT NULL,
        column_id UUID NOT NULL,
        FOREIGN KEY (row_id) REFERENCES rows(id) ON DELETE CASCADE,
        FOREIGN KEY (column_id) REFERENCES columns(id) ON DELETE CASCADE
    );`;
}
createTables().then(() => {
  console.log("Tables created");
  process.exit();
});
