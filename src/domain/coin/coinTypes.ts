export interface CoinValue {
  columnId: string;
  value: string;
}

export interface Coin {
  id: string;
  createdAt: Date;
  values: CoinValue[];
}

export interface GetCoinsQuery {
  id: string;
  createdAt: Date;
  columnIds: string[];
  values: string[];
}

export interface GetCoinQuery {
  id: string;
  createdAt: Date;
  columnId: string;
  value: string;
}
