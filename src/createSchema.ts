import { sql } from "./config/database/connection";

async function createTables() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
  await sql`CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    isVerified BOOLEAN NOT NULL
    );`;
  await sql`CREATE TABLE tables (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        userId UUID NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
    );`;
  await sql`CREATE TABLE columns (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        tableId UUID NOT NULL,
        dataType TEXT NOT NULL,
        FOREIGN KEY (tableId) REFERENCES tables(id)
    );`;
  await sql`CREATE TABLE rows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tableId UUID NOT NULL,
    FOREIGN KEY (tableId) REFERENCES tables(id)
    );`;
  await sql`CREATE TABLE rows_values (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        value TEXT NOT NULL,
        rowId UUID NOT NULL,
        columnId UUID NOT NULL,
        FOREIGN KEY (rowId) REFERENCES rows(id),
        FOREIGN KEY (columnId) REFERENCES columns(id)
    );`;
}
createTables().then(() => {
  console.log("Tables created");
  process.exit();
});
