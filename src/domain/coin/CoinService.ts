import { CoinRepository } from "./CoinRepository";
import { parseCreateCoinInput } from "./coinValidation";

class CoinService {
  constructor(private coinRepository: CoinRepository) {}

  public async createCoin(data: unknown, userId: string) {
    const { values, collectionId } = parseCreateCoinInput(data);
    return this.coinRepository.createCoin(values, collectionId, userId);
  }
}
export const coinService = new CoinService(new CoinRepository());
