import { Sale } from "./../../../shared/models/sales";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from "../../authentication/token.service";
import apiKey from "../../apiKey";

@Injectable({
  providedIn: "root",
})
export class SaleService {
  authToken: string;
  headers: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  postNewSale(sale: Sale) {
    return this.http.post(apiKey.api + "/sale", sale, {
      headers: this.headers,
    });
  }
  getTotalSales(subId: number) {
    return this.http.get<any>(apiKey.api + `/sale/${subId}/total`, {
      headers: this.headers,
    });
  }
  getSubsidiarySales(
    prodId: number,
    page: number,
    size: number,
    order: string,
    asc: boolean,
    filterValue: any,
    filterType: string
  ) {
    return this.http.get<Sale[]>(
      apiKey.api +
        `/sale/${prodId}/list?page=${
          (page - 1) * size
        }&size=${size}&order=${order}&asc=${asc}&value=${filterValue}&typevalue=${filterType}`,
      { headers: this.headers }
    );
  }
  getSale(saleId: number) {
    return this.http.get<Sale>(apiKey.api + `/sale/${saleId}`, {
      headers: this.headers,
    });
  }
  updateSale(sale: Sale) {
    return this.http.put(apiKey.api + "/sale", sale, {
      headers: this.headers,
    });
  }
  deleteSale(saleId: number) {
    return this.http.delete(apiKey.api + `/sale/${saleId}`, {
      headers: this.headers,
    });
  }
}
