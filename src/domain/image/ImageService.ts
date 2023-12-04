import { randomUUID } from "crypto";
import { S3 } from "../../config/s3";
import { CoinNotExistsError } from "../../errors/CoinExistsError";
import { isUserOwnsCoin } from "../shared/database";
import { ImageRepository } from "./ImageRepository";
import { parseDeleteImageInput, parseUploadImageInput } from "./imageValidation";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { BUCKET_NAME } from "../../config/env";

export class ImageService {
  constructor(private imageRepository: ImageRepository) {}

  public async uploadImage(data: unknown, file: Express.Multer.File, userId: string) {
    const { coinId } = parseUploadImageInput(data);
    if (!(await isUserOwnsCoin(coinId, userId))) throw new CoinNotExistsError();
    const imageId = randomUUID();
    const optimizedBuffer = await sharp(file.buffer)
      .withMetadata({})
      .webp({ quality: 75 })
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .toBuffer();
    const thumbnailBuffer = await sharp(optimizedBuffer).resize({ height: 256 }).toBuffer();
    await Promise.all([this.sendFile(imageId, optimizedBuffer), this.sendFile(`${imageId}_thumbnail`, thumbnailBuffer)]);
    await this.imageRepository.saveImageId(imageId, coinId);
  }

  private sendFile(fileName: string, buffer: Buffer) {
    return S3.send(
      new PutObjectCommand({ Bucket: BUCKET_NAME, Key: `${fileName}.webp`, Body: buffer, ContentType: "image/webp" }),
    );
  }
  private deleteFile(fileName: string) {
    return S3.send(new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: `${fileName}.webp` }));
  }

  public async deleteImage(data: unknown, userId: string) {
    const { imageId } = parseDeleteImageInput(data);
    await this.imageRepository.deleteImageId(imageId, userId);
    await Promise.all([this.deleteFile(`${imageId}_thumbnail`), this.deleteFile(imageId)]);
  }
}
export const imageService = new ImageService(new ImageRepository());
