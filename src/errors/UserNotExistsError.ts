import { AppError } from "./appError";

export class UserNotExistsError extends AppError {
  constructor(message: string = "User already exists") {
    super(message, 404, "USER_NOT_EXISTS");
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
