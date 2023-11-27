import { AppError } from "./appError";

export class UserExistsError extends AppError {
  constructor(message: string = "User already exists") {
    super(message, 409, "USER_EXISTS");
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
