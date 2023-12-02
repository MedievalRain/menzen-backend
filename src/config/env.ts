import dotenv from "dotenv";
dotenv.config();

export const POSTGRES_URL = process.env.POSTGRES_URL!;
export const JWT_KEY = process.env.JWT_KEY!;
export const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN!;
export const PORT = process.env.PORT!;
export const RESEND_KEY = process.env.RESEND_KEY!;
export const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY!;
export const S3_SECRET_KEY = process.env.S3_SECRET_KEY!;
export const BUCKET_API_URL = process.env.BUCKET_API_URL!;
if (!(POSTGRES_URL && JWT_KEY && FRONTEND_DOMAIN && PORT && RESEND_KEY && S3_ACCESS_KEY && S3_SECRET_KEY && BUCKET_API_URL)) {
  throw new Error("One of environment variables is missing");
}
