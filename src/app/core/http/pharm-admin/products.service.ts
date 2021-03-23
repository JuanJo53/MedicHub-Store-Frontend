import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "src/app/shared/models/product";
import apiKey from "../../apiKey";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  postNewProduct(product: Product) {
    return this.http.post(apiKey.api + "/product", product);
  }
  getAllProducts(prodId: number) {
    return this.http.get<Product[]>(apiKey.api + "/product" + prodId);
  }
  getProducts(prodId: number) {
    return this.http.get<Product>(apiKey.api + "/product/" + prodId);
  }
  updateProduct(prodId: number, pharmacy: Product) {
    return this.http.put(apiKey.api + `/product`, pharmacy);
  }
  deleteProduct(prodId: number) {
    return this.http.delete(apiKey.api + `/product/${prodId}`);
  }
}
