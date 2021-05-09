import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NewProductOrder } from "src/app/shared/models/new-product-order";
import { Order } from "src/app/shared/models/order";
import { Payment } from "src/app/shared/models/payment";
import { Product } from "src/app/shared/models/product";
import { ProductOrder } from "src/app/shared/models/product-order";
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

  postNewOrderItem(product: NewProductOrder) {
    console.log(product);
    return this.http.post(apiKey.api + `/reserve`, product, {
      headers: this.headers,
    });
  }
  getTotalOrders(clientId: number) {
    return this.http.get<any>(apiKey.api + `/reserve/${clientId}/total`, {
      headers: this.headers,
    });
  }
  getTotalCostOrders(clientId: number) {
    return this.http.get<any>(apiKey.api + `/reserve/${clientId}/total`, {
      headers: this.headers,
    });
  }
  getQuantityOrder(clientId: number) {
    return this.http.get<any>(apiKey.api + `/reserve/${clientId}/quantity`, {
      headers: this.headers,
    });
  }
  getClientOrderItems(clientId: number) {
    return this.http.get<Product[]>(
      apiKey.api + `/reserve/${clientId}/list?page=0&size=500&state=1`,
      {
        headers: this.headers,
      }
    );
  }
  removeOrderItems(clientId: number) {
    return this.http.delete(apiKey.api + `/reserve/${clientId}/client`, {
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
  getOrderDetail(clientId: number, page: number, size: number) {
    return this.http.get<Order>(
      apiKey.api +
        `/reserve/${clientId}/list?page=${
          (page - 1) * size
        }&size=${size}&state=1`,
      {
        headers: this.headers,
      }
    );
  }
  updateOrderItemQuantity(item: ProductOrder) {
    return this.http.put(apiKey.api + `/reserve`, item, {
      headers: this.headers,
    });
  }
  payCart(item: Payment) {
    return this.http.post(apiKey.api + `/payment`, item, {
      headers: this.headers,
    });
  }
  removeOrderItem(productId: number) {
    return this.http.delete(apiKey.api + `/reserve/${productId}`, {
      headers: this.headers,
    });
  }
}
