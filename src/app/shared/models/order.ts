import { Product } from "./product";

export interface Order {
  reserveId: number;
  total: number;
  product: Product[];
}
