import z from "zod";
import { ValidationError } from "../../errors/ValidationError";

const newColumnSchema = z.object({
  name: z.string().min(1),
  id: z.string().uuid(),
});

export const parseNewColumnInput = (data: unknown) => {
  try {
    return newColumnSchema.parse(data);
  } catch {
    throw new ValidationError();
  }
};
