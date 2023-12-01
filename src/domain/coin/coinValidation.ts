import z from "zod";
import { ValidationError } from "../../errors/ValidationError";

const coinValueSchema = z.object({
  columnId: z.string().uuid(),
  value: z.string(),
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

const getCoinsSchema = z.object({
  collectionId: z.string().uuid(),
});

export const parseGetCoinsInput = (data: unknown) => {
  try {
    return getCoinsSchema.parse(data);
  } catch {
    throw new ValidationError();
  }
};

const getCoinSchema = z.object({
  coinId: z.string().uuid(),
});

export const parseGetCoinInput = (data: unknown) => {
  try {
    return getCoinSchema.parse(data);
  } catch {
    throw new ValidationError();
  }
};

const editCoinValuesSchema = z.object({
  coinId: z.string().uuid(),
  values: z.array(coinValueSchema),
});

export const parseEditCoinValuesInput = (data: unknown) => {
  try {
    return editCoinValuesSchema.parse(data);
  } catch {
    throw new ValidationError();
  }
};
