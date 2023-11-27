import { sql } from "../../config/database/connection";
import { UserExistsError } from "../../errors/UserExistsError";
import { IdResponse } from "./userTypes";

export class UserRepository {
  public async createUser(email: string, passwordHash: string): Promise<string> {
    try {
      const rows = await sql<IdResponse[]>`INSERT INTO users ${sql({
        email,
        passwordHash,
        isVerified: false,
      })} RETURNING id`;
      return rows[0].id;
    } catch (error) {
      if (error instanceof sql.PostgresError) {
        if (error.code === "23505") {
          throw new UserExistsError();
        }
      }
      throw error;
    }
  }
}
