import z from "zod";
import { ApiError } from "../../errors/ApiError";

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
    throw ApiError.Validation();
  }
};

const getCoinsSchema = z.object({
  collectionId: z.string().uuid(),
});

export const parseGetCoinsInput = (data: unknown) => {
  try {
    return getCoinsSchema.parse(data);
  } catch {
    throw ApiError.Validation();
  }
};

const getCoinSchema = z.object({
  coinId: z.string().uuid(),
});

export const parseGetCoinInput = (data: unknown) => {
  try {
    return getCoinSchema.parse(data);
  } catch {
    throw ApiError.Validation();
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
    throw ApiError.Validation();
  }
};

const deleteCoinSchema = z.object({
  id: z.string().uuid(),
});

export const parseDeleteCoinInput = (data: unknown) => {
  try {
    return deleteCoinSchema.parse(data);
  } catch {
    throw ApiError.Validation();
  }
};
