import { AppError } from "./appError";

export class UserVerifiedError extends AppError {
  constructor(message: string = "User already verified") {
    super(message, 409, "USER_VERIFIED");
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
