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

const renameTableSchema = z.object({
  name: z.string().min(1),
  tableId: z.string().uuid(),
});

export const parseRenameTableInput = (data: unknown) => {
  try {
    return renameTableSchema.parse(data);
  } catch {
    throw new ValidationError();
  }
};
