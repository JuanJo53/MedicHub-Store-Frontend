import { Product } from "./product";

export interface Sale {
  saleId: number;
  total: number;
  date: string;
  size: number;
  product: Product[];
}
