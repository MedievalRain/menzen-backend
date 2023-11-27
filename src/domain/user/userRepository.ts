import { sql } from "../../config/database/connection";
import { UserExistsError } from "../../errors/UserExistsError";

export class UserRepository {
  public async createUser(email: string, passwordHash: string): Promise<string> {
    try {
      const [row] = await sql`INSERT INTO users ${sql({
        email,
        passwordHash,
        isVerified: false,
      })} RETURNING id`;
      return row.id as string;
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
