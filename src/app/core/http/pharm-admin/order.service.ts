import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "src/app/shared/models/order";
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

  postNewOrder(order: Order) {
    return this.http.post(apiKey.api + "/order", order, {
      headers: this.headers,
    });
  }
  getTotalPharmOrders(subId: number) {
    return this.http.get<any>(apiKey.api + `/order/${subId}/total`, {
      headers: this.headers,
    });
  }

  getSubsidiaryOrders(
    subsiId: number,
    page: number,
    size: number,
    type: number,
    filter: number,
    typeFilter: number
  ) {
    return this.http.get<Order[]>(
      apiKey.api +
        `/reserve/${subsiId}/subsidiary/list?page=${
          (page - 1) * size
        }&size=${size}&state=${type}`,
      { headers: this.headers }
    );
  }
  getOrders(orderId: number) {
    return this.http.get<Order>(apiKey.api + `/order/${orderId}`, {
      headers: this.headers,
    });
  }
  updateOrders(orderId: number) {
    return this.http.put(apiKey.api + `/order/${orderId}/confirm`, {
      headers: this.headers,
    });
  }
  deleteOrders(orderId: number) {
    return this.http.delete(apiKey.api + `/order/${orderId}`, {
      headers: this.headers,
    });
  }
}
