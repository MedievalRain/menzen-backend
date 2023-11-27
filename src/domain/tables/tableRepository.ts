import { sql } from "../../config/database/connection";
import { TableNotExistsError } from "../../errors/TableNotExistsError";
import { UserNotExistsError } from "../../errors/UserNotExistsError";
import { Table } from "./tableTypes";

export class TableRepository {
  public async createTable(name: string, userId: string) {
    try {
      await sql`INSERT INTO tables ${sql({
        userId,
        name,
      })}`;
    } catch (error) {
      if (error instanceof sql.PostgresError) {
        if (error.code === "23503") {
          throw new UserNotExistsError();
        }
      }
      throw error;
    }
  }
  public async renameTable(name: string, tableId: string, userId: string) {
    const result = await sql`UPDATE tables set ${sql({ name })} WHERE id=${tableId} AND user_id=${userId}`;
    if (result.count === 0) throw new TableNotExistsError();
  }

  public async deleteTable(tableId: string, userId: string) {
    const result = await sql`DELETE FROM tables WHERE id=${tableId} AND user_id=${userId}`;
    if (result.count === 0) throw new TableNotExistsError();
  }

  public async getTables(userId: string): Promise<Table[]> {
    return sql<Table[]>`SELECT id,name,created_at FROM tables WHERE user_id=${userId}`;
  }
}
