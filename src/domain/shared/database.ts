import { sql } from "../../config/database/connection";

export const isUserOwnsCollection = async (collectionId: string, userId: string): Promise<boolean> => {
  const result = await sql`
      SELECT 1
      FROM collections
      WHERE id = ${collectionId} AND user_id = ${userId}`;
  return result.count === 1;
};
