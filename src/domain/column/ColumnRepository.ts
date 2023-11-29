import { sql } from "../../config/database/connection";
import { TableNotExistsError } from "../../errors/TableNotExistsError";
import { ColumnExistsError } from "../../errors/ColumnExistsError";
import { Column } from "./columnTypes";

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
}
