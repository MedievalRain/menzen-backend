import { AppError } from "./appError";

export class ColumnExistsError extends AppError {
  constructor(message: string = "Column with such name already exists") {
    super(message, 409, "COLUMN_EXISTS");
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
