import { sql } from "../../config/database/connection";
import { CoinNotExistsError } from "../../errors/CoinExistsError";
import { ImageNotExistsError } from "../../errors/ImageNotExistsError";

export class ImageRepository {
  public async saveImageId(imageId: string, coinId: string) {
    try {
      await sql`INSERT INTO coin_images ${sql({ id: imageId, coinId })}`;
    } catch (error) {
      if (error instanceof sql.PostgresError) {
        if (error.code === "23503") {
          throw new CoinNotExistsError();
        }
      }
      throw error;
    }
  }
  private async isUserOwnsImage(imageId: string, userId: string) {
    const result = await sql`
    SELECT 1
    FROM coin_images
    JOIN coins ON coin_images.coin_id=coins.id
    JOIN collections ON coins.collection_id=collections.id
    WHERE coin_images.id=${imageId} AND collections.user_id = ${userId}`;
    return result.count === 1;
  }
  public async deleteImageId(imageId: string, userId: string) {
    {
      if (!(await this.isUserOwnsImage(imageId, userId))) throw new ImageNotExistsError();
      await sql`DELETE FROM coin_images WHERE id=${imageId}`;
    }
  }
}
