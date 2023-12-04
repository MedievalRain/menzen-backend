import { AppError } from "./appError";

export class WrongPasswordError extends AppError {
  constructor(message: string = "Wrong password") {
    super(message, 403, "WRONG_PASSWORD");
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
