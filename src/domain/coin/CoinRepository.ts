import { randomUUID } from "crypto";
import { sql } from "../../config/database/connection";
import { CollectionNotExistsError } from "../../errors/CollectionNotExistsError";
import { isUserOwnsCollection } from "../shared/database";
import { CoinValue } from "./coinTypes";

export class CoinRepository {
  public async createCoin(values: CoinValue[], collectionId: string, userId: string): Promise<string> {
    if (!(await isUserOwnsCollection(collectionId, userId))) throw new CollectionNotExistsError();
    return sql.begin(async (sql) => {
      const coinId = randomUUID();
      await sql`INSERT INTO coins ${sql({ id: coinId, collectionId })}`;
      const insertData = values.map((value) => {
        return { ...value, coinId };
      });
      try {
        await sql`INSERT INTO coins_values ${sql(insertData)}`;
        return coinId;
      } catch (error) {
        if (error instanceof sql.PostgresError) {
          if (error.code === "23503") {
            throw new CollectionNotExistsError();
          }
        }
        throw error;
      }
    });
  }
}
