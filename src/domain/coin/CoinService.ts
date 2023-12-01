import { CoinRepository } from "./CoinRepository";
import { parseCreateCoinInput, parseGetCoinsInput } from "./coinValidation";

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
}
export const coinService = new CoinService(new CoinRepository());
