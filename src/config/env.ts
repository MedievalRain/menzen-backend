import dotenv from "dotenv";
dotenv.config();

export const POSTGRES_URL = process.env.POSTGRES_URL!;
export const JWT_KEY = process.env.JWT_KEY!;

if (!(POSTGRES_URL && JWT_KEY)) {
  throw new Error("One of environment variables is missing");
}
