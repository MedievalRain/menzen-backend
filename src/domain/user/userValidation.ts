import z from "zod";
import { ApiError } from "../../errors/ApiError";

const authInputSchema = z.object({
  email: z.string().email().min(3),
  password: z.string().min(8),
});

export const parseAuthInput = (data: unknown) => {
  try {
    return authInputSchema.parse(data);
  } catch {
    throw ApiError.Validation();
  }
};

const userIdInputSchema = z.object({
  id: z.string().uuid(),
});
export const parseUserId = (data: unknown) => {
  try {
    return userIdInputSchema.parse(data);
  } catch {
    throw ApiError.Validation();
  }
};
