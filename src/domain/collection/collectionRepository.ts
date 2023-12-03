import { randomUUID } from "crypto";
import { sql } from "../../config/database/connection";
import { CollectionNotExistsError } from "../../errors/CollectionNotExistsError";
import { UserNotExistsError } from "../../errors/UserNotExistsError";
import { Collection } from "./collectionTypes";

export class CollectionRepository {
  public async createCollection(name: string, userId: string) {
    await sql.begin(async (sql) => {
      const collectionId = randomUUID();
      try {
        await sql`INSERT INTO collections ${sql({
          id: collectionId,
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
      await sql`INSERT INTO columns (name, collection_id, ordering, type) VALUES ('Фото',${collectionId},0,'images')`;
    });
  }
  public async renameCollection(name: string, collectionId: string, userId: string) {
    const result = await sql`UPDATE collections set ${sql({ name })} WHERE id=${collectionId} AND user_id=${userId}`;
    if (result.count === 0) throw new CollectionNotExistsError();
  }

  public async deleteCollection(collectionId: string, userId: string) {
    const result = await sql`DELETE FROM collections WHERE id=${collectionId} AND user_id=${userId}`;
    if (result.count === 0) throw new CollectionNotExistsError();
  }

  public async getCollections(userId: string): Promise<Collection[]> {
    return sql<Collection[]>`
        SELECT 
            t.id,
            t.name,
            COUNT(c.id) AS count
        FROM 
            collections t
        LEFT JOIN 
            coins c ON t.id = c.collection_id
        WHERE 
            t.user_id = ${userId}
        GROUP BY 
            t.id, t.name
        ORDER BY 
            t.created_at DESC
    `;
  }
}
