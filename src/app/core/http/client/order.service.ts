import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "src/app/shared/models/product";
import apiKey from "../../apiKey";
import { TokenService } from "../../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  authToken: string;
  headers: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  postNewOrderItem(userId: number, product: Product) {
    return this.http.post(apiKey.api + `/order/${userId}`, product, {
      headers: this.headers,
    });
  }
  getUserOrderProducts(userId: number) {
    return this.http.get<Product[]>(apiKey.api + `/order/${userId}`, {
      headers: this.headers,
    });
  }
}
