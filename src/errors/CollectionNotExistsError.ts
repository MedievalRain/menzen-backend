import { AppError } from "./appError";

export class CollectionNotExistsError extends AppError {
  constructor(message: string = "Collection does not exist") {
    super(message, 404, "COLLECTION_NOT_EXISTS");
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
