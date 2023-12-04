import { AppError } from "./appError";

export class JWTError extends AppError {
  constructor(message: string = "JWT is not valid") {
    super(message, 403, "INVALID_JWT");
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
