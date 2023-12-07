import z from "zod";
import { ApiError } from "../../errors/ApiError";

const uploadImageSchema = z.object({
  coinId: z.string().uuid(),
});

export const parseUploadImageInput = (data: unknown) => {
  try {
    return uploadImageSchema.parse(data);
  } catch {
    throw ApiError.Validation();
  }
};

const deleteImageSchema = z.object({
  imageId: z.string().uuid(),
});

export const parseDeleteImageInput = (data: unknown) => {
  try {
    return deleteImageSchema.parse(data);
  } catch {
    throw ApiError.Validation();
  }
};
