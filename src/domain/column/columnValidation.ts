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
const getColumnsSchema = z.object({
  id: z.string().uuid(),
});

export const parseGetColumnsInput = (data: unknown) => {
  try {
    return getColumnsSchema.parse(data);
  } catch {
    throw new ValidationError();
  }
};
