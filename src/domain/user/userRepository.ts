import { sql } from "../../config/database/connection";
import { ApiError } from "../../errors/ApiError";

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
          throw ApiError.UserExists();
        }
      }
      throw error;
    }
  }

  public async verifyEmail(id: string) {
    const rows = await sql<IsVerifiedResponse[]>`SELECT is_verified FROM users WHERE id=${id}`;
    if (rows.length === 0) {
      throw ApiError.UserNotExist();
    } else if (rows[0].isVerified) {
      throw ApiError.UserVerified();
    } else {
      const result = await sql`UPDATE users set ${sql({ isVerified: true })} WHERE id=${id}`;
      if (result.count === 0) {
        throw ApiError.UserNotExist();
      }
    }
  }

  public async getUserCredentials(email: string) {
    const rows = await sql<UserCredentialsResponse[]>`SELECT id,password_hash,is_verified FROM users WHERE email=${email}`;
    if (rows.length === 0) {
      throw ApiError.UserNotExist();
    }
    return rows[0];
  }

  public async deleteUser(userId: string) {
    const result = await sql`DELETE FROM users WHERE id=${userId}`;
    if (result.count === 0) {
      throw ApiError.UserNotExist();
    }
  }
}
