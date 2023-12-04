import { AppError } from "./appError";

export class ImageNotExistsError extends AppError {
  constructor(message: string = "Image does not exist") {
    super(message, 404, "IMAGE_NOT_EXISTS");
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
