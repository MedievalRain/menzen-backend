import { AppError } from "./appError";

export class ColumnNotExistError extends AppError {
  constructor(message: string = "Column doies not exist") {
    super(message, 409, "COLUMN_NOT_EXIST");
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
