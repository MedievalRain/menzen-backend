import { fakerRU as faker } from "@faker-js/faker";

import { CoinRepository } from "./domain/coin/CoinRepository";

export interface CoinValue {
  columnId: string;
  value: string;
}
const coinRepository = new CoinRepository();
const populateFakeData = async (columnIds: string[], collectionId: string, userId: string) => {
  for (let i = 0; i < 2000; i++) {
    const coinValues: CoinValue[] = columnIds.map((columnId) => {
      let value = "";
      switch (columnId) {
        case "466dc875-e655-4a3d-95e6-bb3c65574ce8":
          value = faker.date.anytime().getFullYear().toString();
          break;

        case "19c2c5b7-b507-4f4f-ac7d-a5acfddb9b8b":
          value = faker.location.country();
          break;
        case "8c49fa7a-593e-4954-af7e-f80800bfb5d8":
          value = faker.person.fullName();
          break;

        default:
          value = faker.lorem.words(2);
      }

      return { columnId, value };
    });

    await coinRepository.createCoin(coinValues, collectionId, userId);
    console.log(i);
  }
};

populateFakeData(
  [
    "205039e8-49bc-40ea-b9e0-7880f5f9cf22",
    "19c2c5b7-b507-4f4f-ac7d-a5acfddb9b8b",
    "466dc875-e655-4a3d-95e6-bb3c65574ce8",
    "29299b43-44ac-4b9a-872e-74dcd5f42638",
    "8c49fa7a-593e-4954-af7e-f80800bfb5d8",
  ],
  "a70f888a-d960-4a5f-a02a-b6582ef39c10",
  "e538fea2-3280-4e1a-9b23-63d3c5413e02",
).then(console.log);
