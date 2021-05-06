import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "src/app/shared/models/order";
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

  postNewOrderItem(product: Product) {
    return this.http.post(apiKey.api + `/reserve`, product, {
      headers: this.headers,
    });
  }
  getTotalOrders(subId: number) {
    return this.http.get<any>(apiKey.api + `/order/${subId}/total`, {
      headers: this.headers,
    });
  }
  getClientOrders(
    prodId: number,
    page: number,
    size: number,
    order: string,
    asc: boolean,
    filterValue: any,
    filterType: string
  ) {
    return this.http.get<Order[]>(
      apiKey.api +
        `/order/${prodId}/list?page=${
          (page - 1) * size
        }&size=${size}&order=${order}&asc=${asc}&value=${filterValue}&typevalue=${filterType}`,
      { headers: this.headers }
    );
  }
  getOrders(orderId: number) {
    return this.http.get<Order>(apiKey.api + `/order/${orderId}`, {
      headers: this.headers,
    });
  }
}
