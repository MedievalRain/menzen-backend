import { sql } from "../../config/database/connection";
import { CoinNotExistsError } from "../../errors/CoinExistsError";

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
}
