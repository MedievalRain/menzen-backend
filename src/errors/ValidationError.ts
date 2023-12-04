import { AppError } from "./appError";

export class ValidationError extends AppError {
  constructor(message: string = "Validation error") {
    super(message, 400, "VALIDATION_ERROR");
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
