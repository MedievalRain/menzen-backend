import z from "zod";
import { ValidationError } from "../../errors/ValidationError";

const coinValueSchema = z.object({
  columnId: z.string().uuid(),
  value: z.string().min(1),
});

const createCoinSchema = z.object({
  collectionId: z.string().uuid(),
  values: z.array(coinValueSchema),
});

export const parseCreateCoinInput = (data: unknown) => {
  try {
    return createCoinSchema.parse(data);
  } catch {
    throw new ValidationError();
  }
};
