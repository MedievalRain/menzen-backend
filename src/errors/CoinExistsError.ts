import { AppError } from "./appError";

export class CoinNotExistsError extends AppError {
  constructor(message: string = "Coin does not exist") {
    super(message, 404, "COIN_NOT_EXISTS");
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
