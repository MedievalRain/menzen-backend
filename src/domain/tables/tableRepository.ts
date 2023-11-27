import { sql } from "../../config/database/connection";
import { TableNotExistsError } from "../../errors/TableNotExistsError";
import { UserNotExistsError } from "../../errors/UserNotExistsError";

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
}
