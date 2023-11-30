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

const deleteColumnSchema = z.object({
  tableId: z.string().uuid(),
  columnId: z.string().uuid(),
});

export const parseDeleteColumnInput = (data: unknown) => {
  try {
    return deleteColumnSchema.parse(data);
  } catch {
    throw new ValidationError();
  }
};
const renameColumnSchema = z.object({
  tableId: z.string().uuid(),
  columnId: z.string().uuid(),
  name: z.string().min(1).max(256),
});

export const parseRenameColumnInput = (data: unknown) => {
  try {
    return renameColumnSchema.parse(data);
  } catch {
    throw new ValidationError();
  }
};
