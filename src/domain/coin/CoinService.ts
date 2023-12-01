import { CoinRepository } from "./CoinRepository";
import { parseCreateCoinInput, parseEditCoinValuesInput, parseGetCoinInput, parseGetCoinsInput } from "./coinValidation";

class CoinService {
  constructor(private coinRepository: CoinRepository) {}

  public async createCoin(data: unknown, userId: string) {
    const { values, collectionId } = parseCreateCoinInput(data);
    return this.coinRepository.createCoin(values, collectionId, userId);
  }
  public async getCoins(data: unknown, userId: string) {
    const { collectionId } = parseGetCoinsInput(data);
    return this.coinRepository.getCoins(collectionId, userId);
  }

  public async getCoin(data: unknown, userId: string) {
    const { coinId } = parseGetCoinInput(data);
    return this.coinRepository.getCoin(coinId, userId);
  }

  public async editCoinValues(data: unknown, userId: string) {
    const { values, coinId } = parseEditCoinValuesInput(data);
    return this.coinRepository.editCoinValues(values, coinId, userId);
  }
}
export const coinService = new CoinService(new CoinRepository());
