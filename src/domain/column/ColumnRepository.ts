import { sql } from "../../config/database/connection";
import { TableNotExistsError } from "../../errors/TableNotExistsError";
import { ColumnExistsError } from "../../errors/ColumnExistsError";
import { Column } from "./columnTypes";
import { ColumnNotExistError } from "../../errors/ColumnNotExistError";

export class ColumnRepository {
  public async createColumn(name: string, tableId: string, userId: string) {
    try {
      const result = await sql`INSERT INTO columns (name, table_id)
        SELECT ${name}, ${tableId}
        WHERE EXISTS (
        SELECT 1 FROM tables
        WHERE id = ${tableId} AND user_id = ${userId}
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
  private async isUserOwnsTable(tableId: string, userId: string) {
    const result = await sql`
    SELECT 1
    FROM tables
    WHERE id = ${tableId} AND user_id = ${userId}`;
    return result.count === 1;
  }

  public async getColumns(tableId: string, userId: string): Promise<Column[]> {
    if (await this.isUserOwnsTable(tableId, userId)) {
      return await sql<Column[]>`SELECT id,name FROM columns WHERE table_id=${tableId}`;
    } else {
      throw new TableNotExistsError();
    }
  }
  public async deleteColumn(columnId: string, tableId: string, userId: string) {
    if (await this.isUserOwnsTable(tableId, userId)) {
      const result = await sql<Column[]>`DELETE FROM columns WHERE id=${columnId} AND tableId=${tableId}`;
      if (result.count === 0) throw new ColumnNotExistError();
    } else {
      throw new TableNotExistsError();
    }
  }
}
