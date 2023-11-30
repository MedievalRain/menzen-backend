import { sql } from "../../config/database/connection";
import { TableNotExistsError } from "../../errors/TableNotExistsError";
import { ColumnExistsError } from "../../errors/ColumnExistsError";
import { Column } from "./columnTypes";
import { ColumnNotExistError } from "../../errors/ColumnNotExistError";

export class ColumnRepository {
  public async createColumn(name: string, collectionId: string, userId: string) {
    try {
      const result = await sql`INSERT INTO columns (name, table_id,ordering)
      SELECT ${name}, ${collectionId},COALESCE((SELECT MAX(ordering) + 1 FROM columns WHERE table_id = ${collectionId}), 0)
      WHERE EXISTS (
      SELECT 1 FROM tables
      WHERE id = ${collectionId} AND user_id = ${userId}
    );`;
      if (result.count === 0) throw new TableNotExistsError();
    } catch (error) {
      if (error instanceof sql.PostgresError) {
        if (error.code === "23505") {
          throw new ColumnExistsError();
        }
      }
      throw error;
    }
  }
  private async isUserOwnsCollection(tableId: string, userId: string) {
    const result = await sql`
    SELECT 1
    FROM tables
    WHERE id = ${tableId} AND user_id = ${userId}`;
    return result.count === 1;
  }

  public async getColumns(collectionId: string, userId: string): Promise<Column[]> {
    if (await this.isUserOwnsCollection(collectionId, userId)) {
      return await sql<Column[]>`SELECT id,name,ordering,enabled FROM columns WHERE table_id=${collectionId}`;
    } else {
      throw new TableNotExistsError();
    }
  }
  public async deleteColumn(columnId: string, collectionId: string, userId: string) {
    if (await this.isUserOwnsCollection(collectionId, userId)) {
      const result = await sql<Column[]>`DELETE FROM columns WHERE id=${columnId} AND table_id=${collectionId}`;
      if (result.count === 0) throw new ColumnNotExistError();
    } else {
      throw new TableNotExistsError();
    }
  }
  public async renameColumn(name: string, columnId: string, collectionId: string, userId: string) {
    if (await this.isUserOwnsCollection(collectionId, userId)) {
      const result = await sql<Column[]>`UPDATE columns SET name=${name} WHERE id=${columnId} AND table_id=${collectionId}`;
      if (result.count === 0) throw new ColumnNotExistError();
    } else {
      throw new TableNotExistsError();
    }
  }
}
