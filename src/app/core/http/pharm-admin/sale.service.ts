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
    return this.http.post(apiKey.api + "/purchase", sale, {
      headers: this.headers,
    });
  }
  getTotalSales(subId: number) {
    return this.http.get<any>(apiKey.api + `/sale/${subId}/total`, {
      headers: this.headers,
    });
  }
  getSubsidiarySales(
    subsiId: number,
    page: number,
    size: number,
    order: string,
    asc: boolean,
    filterValue: any,
    filterType: string
  ) {
    return this.http.get<Sale[]>(
      apiKey.api +
        `/purchase/${subsiId}/list?page=${(page - 1) * size}&size=${size}`,
      { headers: this.headers }
    );
  }
  getSaleGraph(saleId: number) {
    return this.http.get<any>(
      apiKey.api + `/purchase/${saleId}/graph?init=2020-01-01&end=2021-05-14`,
      {
        headers: this.headers,
      }
    );
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
