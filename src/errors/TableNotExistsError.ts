import { AppError } from "./appError";

export class TableNotExistsError extends AppError {
  constructor(message: string = "Table does not exist") {
    super(message, 404, "TABLE_NOT_EXISTS");
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
