import { sql } from "../../config/database/connection";
import { Column, OrderDirection } from "./columnTypes";
import { isUserOwnsCollection } from "../shared/database";
import { ApiError } from "../../errors/ApiError";

export class ColumnRepository {
  public async createColumn(name: string, collectionId: string, userId: string) {
    try {
      const result = await sql`INSERT INTO columns (name, collection_id, ordering,type)
      SELECT ${name}, ${collectionId},COALESCE((SELECT MAX(ordering) + 1 FROM columns WHERE collection_id = ${collectionId}), 0), 'regular'
      WHERE EXISTS (
      SELECT 1 FROM collections
      WHERE id = ${collectionId} AND user_id = ${userId}
    );`;
      if (result.count === 0) throw ApiError.CollectionNotExist();
    } catch (error) {
      if (error instanceof sql.PostgresError) {
        if (error.code === "23505") {
          throw ApiError.ColumnExists();
        }
      }
      throw error;
    }
  }

  public async getColumns(collectionId: string, userId: string): Promise<Column[]> {
    if (await isUserOwnsCollection(collectionId, userId)) {
      return await sql<Column[]>`SELECT id,name,ordering,enabled,type FROM columns WHERE collection_id=${collectionId}`;
    } else {
      throw ApiError.CollectionNotExist();
    }
  }
  public async deleteColumn(columnId: string, collectionId: string, userId: string) {
    if (await isUserOwnsCollection(collectionId, userId)) {
      const result = await sql<
        Column[]
      >`DELETE FROM columns WHERE id=${columnId} AND collection_id=${collectionId} AND type='regular'`;
      if (result.count === 0) throw ApiError.ColumnNotExist();
    } else {
      throw ApiError.CollectionNotExist();
    }
  }
  public async renameColumn(name: string, columnId: string, collectionId: string, userId: string) {
    if (await isUserOwnsCollection(collectionId, userId)) {
      const result = await sql<
        Column[]
      >`UPDATE columns SET name=${name} WHERE id=${columnId} AND collection_id=${collectionId}`;
      if (result.count === 0) throw ApiError.ColumnNotExist();
    } else {
      throw ApiError.CollectionNotExist();
    }
  }

  public async changeColumnStatus(enabled: boolean, columnId: string, collectionId: string, userId: string) {
    if (await isUserOwnsCollection(collectionId, userId)) {
      const result = await sql<
        Column[]
      >`UPDATE columns SET enabled=${enabled} WHERE id=${columnId} AND collection_id=${collectionId}`;
      if (result.count === 0) throw ApiError.ColumnNotExist();
    } else {
      throw ApiError.CollectionNotExist();
    }
  }

  private async collectionHasColumn(columnId: string, collectionId: string) {
    const result = await sql`
    SELECT 1
    FROM columns
    WHERE id = ${columnId} AND collection_id = ${collectionId}`;
    return result.count === 1;
  }

  public async changeColumnOrder(direction: OrderDirection, columnId: string, collectionId: string, userId: string) {
    if (!(await isUserOwnsCollection(collectionId, userId))) throw ApiError.CollectionNotExist();
    if (!(await this.collectionHasColumn(columnId, collectionId))) throw ApiError.ColumnNotExist();

    await sql.begin(async (sql) => {
      const currentOrderResult = await sql`SELECT ordering FROM columns WHERE collection_id=${collectionId} AND id=${columnId}`;
      const currentOrdering = currentOrderResult[0].ordering as number;

      let swapQuery;
      if (direction === "down") {
        swapQuery = sql`SELECT id, ordering FROM columns WHERE collection_id=${collectionId} AND ordering > ${currentOrdering} ORDER BY ordering ASC LIMIT 1`;
      } else {
        swapQuery = sql`SELECT id, ordering FROM columns WHERE collection_id=${collectionId} AND ordering < ${currentOrdering} ORDER BY ordering DESC LIMIT 1`;
      }

      const swapResult = await swapQuery;
      if (swapResult.length === 0) throw ApiError.Ordering();

      const targetColumnId = swapResult[0].id;
      const targetOrdering = swapResult[0].ordering;

      await sql`UPDATE columns SET ordering=${targetOrdering} WHERE id=${columnId}`;
      await sql`UPDATE columns SET ordering=${currentOrdering} WHERE id=${targetColumnId}`;
    });
  }
}
