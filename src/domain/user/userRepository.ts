import { sql } from "../../config/database/connection";
import { UserExistsError } from "../../errors/UserExistsError";
import { UserNotExistsError } from "../../errors/UserNotExistsError";
import { UserVerifiedError } from "../../errors/UserVerifiedError";
import { IdResponse, IsVerifiedResponse, UserCredentialsResponse } from "./userTypes";

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

  public async verifyEmail(id: string) {
    const rows = await sql<IsVerifiedResponse[]>`SELECT isVerified FROM users WHERE ${sql({ id })}`;
    if (rows.length === 0) {
      throw new UserNotExistsError();
    } else if (rows[0].isVerified) {
      throw new UserVerifiedError();
    } else {
      const result = await sql`UPDATE users set ${sql({ isVerified: true })} WHERE ${sql({ id })}`;
      if (result.count === 0) {
        throw new UserNotExistsError();
      }
    }
  }

  public async getUserCredentials(email: string) {
    const rows = await sql<UserCredentialsResponse[]>`SELECT id,passwordHash FROM users where ${sql({ email })}`;
    if (rows.length === 0) {
      throw new UserNotExistsError();
    }
    return rows[0];
  }
}
