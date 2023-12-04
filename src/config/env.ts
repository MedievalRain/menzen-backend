import dotenv from "dotenv";
dotenv.config();

export const POSTGRES_URL = process.env.POSTGRES_URL!;
export const JWT_KEY = process.env.JWT_KEY!;
export const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN!;
export const RESEND_KEY = process.env.RESEND_KEY!;
export const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY!;
export const S3_SECRET_KEY = process.env.S3_SECRET_KEY!;
export const BUCKET_API_URL = process.env.BUCKET_API_URL!;
export const BUCKET_NAME = process.env.BUCKET_NAME!;

if (
  !(POSTGRES_URL && JWT_KEY && FRONTEND_DOMAIN && RESEND_KEY && S3_ACCESS_KEY && S3_SECRET_KEY && BUCKET_API_URL && BUCKET_NAME)
) {
  throw new Error("One of environment variables is missing");
}
