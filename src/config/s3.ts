import { S3Client } from "@aws-sdk/client-s3";
import { S3_ACCESS_KEY, S3_SECRET_KEY } from "./env";

export const S3 = new S3Client({
  region: "auto",
  endpoint: "https://1001776c0d81034381171d1607e8ed85.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
  },
});
