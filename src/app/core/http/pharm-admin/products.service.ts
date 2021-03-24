import { TokenService } from "src/app/core/authentication/token.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "src/app/shared/models/product";
import apiKey from "../../apiKey";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}
  postNewProduct(product: Product) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.post(apiKey.api + "/product", product, {
      headers: headers,
    });
  }
  getSubsidiaryProducts(prodId: number) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.get<Product[]>(
      apiKey.api + `/subsidiary/${prodId}/product`,
      { headers: headers }
    );
  }
  getProduct(prodId: number) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.get<Product>(apiKey.api + `/product/${prodId}`, {
      headers: headers,
    });
  }
  updateProduct(pharmacy: Product) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.put(apiKey.api + `/product`, pharmacy, {
      headers: headers,
    });
  }
  deleteProduct(prodId: number) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.delete(apiKey.api + `/product/${prodId}`, {
      headers: headers,
    });
  }
}
