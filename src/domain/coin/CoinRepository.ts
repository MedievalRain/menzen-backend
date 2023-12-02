import { randomUUID } from "crypto";
import { sql } from "../../config/database/connection";
import { CollectionNotExistsError } from "../../errors/CollectionNotExistsError";
import { isUserOwnsCollection } from "../shared/database";
import { Coin, CoinValue, GetCoinQuery, GetCoinsQuery } from "./coinTypes";
import { CoinNotExistsError } from "../../errors/CoinExistsError";
import { ColumnNotExistError } from "../../errors/ColumnNotExistError";

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

  private async isUserOwnsCoin(coinId: string, userId: string) {
    const result = await sql`
    SELECT 1
    FROM coins
    JOIN collections ON coins.collection_id=collections.id
    WHERE coins.id = ${coinId} AND collections.user_id = ${userId}`;
    return result.count === 1;
  }

  public async getCoin(coinId: string, userId: string): Promise<Coin> {
    if (!(await this.isUserOwnsCoin(coinId, userId))) throw new CoinNotExistsError();
    const rows = await sql<GetCoinQuery[]>`
    SELECT c.created_at,cv.column_id,cv.value
    FROM coins c
    INNER JOIN coins_values cv ON c.id = cv.coin_id
    WHERE c.id = ${coinId}`;
    if (rows.count === 0) throw new CoinNotExistsError();
    const values: CoinValue[] = rows.map((row) => {
      return { columnId: row.columnId, value: row.value };
    });
    const { id, createdAt } = rows[0];
    return {
      id,
      createdAt,
      values,
    };
  }

  public async editCoinValues(values: CoinValue[], coinId: string, userId: string) {
    if (!(await this.isUserOwnsCoin(coinId, userId))) throw new CoinNotExistsError();
    try {
      await sql.begin((sql) =>
        values.map(
          (value) => sql`
        INSERT INTO coins_values ${sql({ ...value, coinId })} 
        ON CONFLICT(coin_id,column_id) DO UPDATE
        SET value=${value.value}
        `,
        ),
      );
    } catch (error) {
      if (error instanceof sql.PostgresError) {
        if (error.code === "23503") {
          throw new ColumnNotExistError();
        }
      }
      throw error;
    }
  }

  public async deleteCoin(coinId: string, userId: string) {
    if (!(await this.isUserOwnsCoin(coinId, userId))) throw new CoinNotExistsError();
    const result = await sql`DELETE FROM coins WHERE id=${coinId}`;
    if (result.count === 0) throw new CoinNotExistsError();
  }
}
