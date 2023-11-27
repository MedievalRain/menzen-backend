import dotenv from "dotenv";
dotenv.config();

export const POSTGRES_URL = process.env.POSTGRES_URL!;

if (!POSTGRES_URL) {
  throw new Error("One of environment variables is missing");
}
