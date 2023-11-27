import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "UNAUTHORIZED" });
  }
  try {
    const payload = verifyJWT(token);
    res.locals.userId = payload.id;
    next();
  } catch {
    return res.status(401).json({ error: "UNAUTHORIZED" });
  }
};
