import { AppError } from "./appError";

export class OrderingError extends AppError {
  constructor(message: string = "Bad ordering value") {
    super(message, 400, "ORDERING_ERROR");
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
