import { sql } from "../../config/database/connection";

export const isUserOwnsCollection = async (collectionId: string, userId: string): Promise<boolean> => {
  const result = await sql`
      SELECT 1
      FROM collections
      WHERE id = ${collectionId} AND user_id = ${userId}`;
  return result.count === 1;
};

export const isUserOwnsCoin = async (coinId: string, userId: string) => {
  const result = await sql`
  SELECT 1
  FROM coins
  JOIN collections ON coins.collection_id=collections.id
  WHERE coins.id = ${coinId} AND collections.user_id = ${userId}`;
  return result.count === 1;
};
