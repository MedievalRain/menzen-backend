export interface Column {
  name: string;
  id: string;
  ordering: number;
  enabled: boolean;
  type: "regular" | "images";
}

export interface ColumnIdData {
  id: string;
}

export type OrderDirection = "up" | "down";
