export interface Column {
  name: string;
  id: string;
  ordering: number;
  enabled: boolean;
}

export interface ColumnIdData {
  id: string;
}

export type OrderDirection = "up" | "down";
