import { ErrorTypes } from "./errorTypes";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly type: ErrorTypes;
  constructor(message: string, statusCode: number, type: ErrorTypes) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
