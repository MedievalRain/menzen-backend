import { randomUUID } from "crypto";
import { S3 } from "../../config/s3";
import { CoinNotExistsError } from "../../errors/CoinExistsError";
import { isUserOwnsCoin } from "../shared/database";
import { ImageRepository } from "./ImageRepository";
import { parseUploadImageInput } from "./imageValidation";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

export class ImageService {
  constructor(private imageRepository: ImageRepository) {}

  public async uploadImage(data: unknown, file: Express.Multer.File, userId: string) {
    const { coinId } = parseUploadImageInput(data);
    if (!(await isUserOwnsCoin(coinId, userId))) throw new CoinNotExistsError();
    const fileId = randomUUID();
    const optimizedBuffer = await sharp(file.buffer)
      .withMetadata({})
      .webp({ quality: 75 })
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .toBuffer();
    const thumbnailBuffer = await sharp(optimizedBuffer).resize({ height: 256 }).toBuffer();
    await Promise.all([this.sendFile(fileId, optimizedBuffer), this.sendFile(fileId, thumbnailBuffer)]);
  }

  private sendFile(fileId: string, buffer: Buffer) {
    return S3.send(
      new PutObjectCommand({ Bucket: "menzen", Key: `${fileId}_256.webp`, Body: buffer, ContentType: "image/webp" }),
    );
  }
}
export const imageService = new ImageService(new ImageRepository());
