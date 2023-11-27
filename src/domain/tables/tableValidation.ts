import z from "zod";
import { ValidationError } from "../../errors/ValidationError";

const newTableSchema = z.object({
  name: z.string().min(1),
});

export const parseNewTableInput = (data: unknown) => {
  try {
    return newTableSchema.parse(data);
  } catch {
    throw new ValidationError();
  }
};
