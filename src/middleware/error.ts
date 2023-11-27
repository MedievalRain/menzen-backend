import type { Request, Response } from "express";
import { AppError } from "../errors/appError";

export const errorMiddleware = (err: Error, req: Request, res: Response) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.type,
    });
  }
  console.error("Unhandled error:", err);
  return res.status(500).json({
    error: "INTERNAL_ERROR",
  });
};
