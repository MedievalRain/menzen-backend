import { sql } from "../../config/database/connection";
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
}
