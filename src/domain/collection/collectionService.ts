import { CollectionRepository } from "./collectionRepository";
import { parseDeleteCollectionInput, parseNewCollectionInput, parseRenameCollectionInput } from "./collectionValidation";

class CollectionService {
  constructor(private collectionRepository: CollectionRepository) {}

  public async createCollection(data: unknown, userId: string) {
    const { name } = parseNewCollectionInput(data);
    await this.collectionRepository.createCollection(name, userId);
  }

  public async renameCollection(data: unknown, userId: string) {
    const { name, id: collectionId } = parseRenameCollectionInput(data);
    await this.collectionRepository.renameCollection(name, collectionId, userId);
  }

  public async deleteCollection(data: unknown, userId: string) {
    const { id: collectionId } = parseDeleteCollectionInput(data);
    await this.collectionRepository.deleteCollection(collectionId, userId);
  }

  public async getCollections(userId: string) {
    return this.collectionRepository.getCollections(userId);
  }
}

export const collectionService = new CollectionService(new CollectionRepository());
