import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError";

export const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      error: err.type,
    });
  }
  console.error("Unhandled error:", err);
  return res.status(500).json({
    error: "INTERNAL_ERROR",
  });
};
