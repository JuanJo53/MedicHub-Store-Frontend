import { TokenService } from "src/app/core/authentication/token.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "src/app/shared/models/product";
import apiKey from "../../apiKey";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  authToken: string;
  headers: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  postNewProduct(product: Product) {
    return this.http.post(apiKey.api + "/product", product, {
      headers: this.headers,
    });
  }
  getTotalProducts() {
    return this.http.get<any>(apiKey.api + `/product/total`, {
      headers: this.headers,
    });
  }
  getSubsidiaryProducts(
    prodId: number,
    page: number,
    size: number,
    order: string,
    asc: boolean
  ) {
    return this.http.get<Product[]>(
      apiKey.api +
        `/subsidiary/${prodId}/product?page=${
          (page - 1) * size
        }&size=${size}&order=${order}&asc=${asc}`,
      { headers: this.headers }
    );
  }
  getProduct(prodId: number) {
    return this.http.get<Product>(apiKey.api + `/product/${prodId}`, {
      headers: this.headers,
    });
  }
  updateProduct(pharmacy: Product) {
    return this.http.put(apiKey.api + "/product", pharmacy, {
      headers: this.headers,
    });
  }
  deleteProduct(prodId: number) {
    return this.http.delete(apiKey.api + `/product/${prodId}`, {
      headers: this.headers,
    });
  }
}
