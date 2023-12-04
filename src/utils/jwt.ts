import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_KEY } from "../config/env";
import { JWTError } from "../errors/JWTError";

interface AuthJWT extends JwtPayload {
  id: string;
}

export const generateJWT = (userId: string) => jwt.sign({ id: userId }, JWT_KEY, { expiresIn: "3d" });

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, JWT_KEY) as AuthJWT;
  } catch {
    throw JWTError;
  }
};
