import { randomUUID } from "crypto";
import { sql } from "../../config/database/connection";
import { CollectionNotExistsError } from "../../errors/CollectionNotExistsError";
import { isUserOwnsCollection } from "../shared/database";
import { Coin, CoinValue, GetCoinsQuery } from "./coinTypes";

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
  public async getCoins(collectionId: string, userId: string): Promise<Coin[]> {
    if (!(await isUserOwnsCollection(collectionId, userId))) throw new CollectionNotExistsError();
    const rows = await sql<
      GetCoinsQuery[]
    >`SELECT c.id,array_agg(cv.column_id) AS column_ids,array_agg(cv.value) AS values,c.created_at
    FROM coins c
    INNER JOIN coins_values cv ON c.id = cv.coin_id
    WHERE c.collection_id = ${collectionId} 
    GROUP BY c.id
    ORDER BY c.created_at ASC`;
    return rows.map((row) => {
      const values: CoinValue[] = row.columnIds.map((columnId, index) => {
        return { columnId, value: row.values[index] };
      });
      return { id: row.id, createdAt: row.createdAt, values };
    });
  }
}
