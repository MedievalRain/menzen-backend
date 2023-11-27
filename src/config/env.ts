import dotenv from "dotenv";
dotenv.config();

export const POSTGRES_URL = process.env.POSTGRES_URL!;
export const JWT_KEY = process.env.JWT_KEY!;
export const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN!;
export const PORT = process.env.PORT!;
export const RESEND_KEY = process.env.RESEND_KEY!;

if (!(POSTGRES_URL && JWT_KEY && FRONTEND_DOMAIN && PORT && RESEND_KEY)) {
  throw new Error("One of environment variables is missing");
}
