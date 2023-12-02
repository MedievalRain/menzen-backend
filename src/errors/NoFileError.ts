import { AppError } from "./appError";

export class NoFileError extends AppError {
  constructor(message: string = "No file was sent") {
    super(message, 404, "NO_FILE");
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
