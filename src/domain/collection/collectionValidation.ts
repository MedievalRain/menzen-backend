import z from "zod";
import { ApiError } from "../../errors/ApiError";

const newCollectionSchema = z.object({
  name: z.string().min(1),
});

export const parseNewCollectionInput = (data: unknown) => {
  try {
    return newCollectionSchema.parse(data);
  } catch {
    throw ApiError.Validation();
  }
};

const renameCollectionSchema = z.object({
  name: z.string().min(1),
  id: z.string().uuid(),
});

export const parseRenameCollectionInput = (data: unknown) => {
  try {
    return renameCollectionSchema.parse(data);
  } catch {
    throw ApiError.Validation();
  }
};

const deleteCollectionSchema = z.object({
  id: z.string().uuid(),
});

export const parseDeleteCollectionInput = (data: unknown) => {
  try {
    return deleteCollectionSchema.parse(data);
  } catch {
    throw ApiError.Validation();
  }
};
