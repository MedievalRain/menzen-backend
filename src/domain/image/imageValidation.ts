import z from "zod";
import { ValidationError } from "../../errors/ValidationError";

const uploadImageSchema = z.object({
  coinId: z.string().uuid(),
});

export const parseUploadImageInput = (data: unknown) => {
  try {
    return uploadImageSchema.parse(data);
  } catch {
    throw new ValidationError();
  }
};