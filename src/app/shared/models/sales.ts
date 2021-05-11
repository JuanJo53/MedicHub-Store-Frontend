import { Product } from "./product";

export interface Sale {
  saleId: number;
  total: number;
  date: string;
  product: Product[];
}
