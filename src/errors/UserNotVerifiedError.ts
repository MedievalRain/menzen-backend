import { AppError } from "./appError";

export class UserNotVerifiedError extends AppError {
  constructor(message: string = "User already verified") {
    super(message, 403, "USER_NOT_VERIFIED");
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
