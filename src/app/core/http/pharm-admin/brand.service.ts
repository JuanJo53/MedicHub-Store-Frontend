import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Brand } from "src/app/shared/models/brand";
import apiKey from "../../apiKey";
import { TokenService } from "../../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class BrandService {
  authToken: string;
  headers: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }
  postNewBrand(brand: Brand) {
    return this.http.post(apiKey.api + "/brand", brand, {
      headers: this.headers,
    });
  }
  getBrands() {
    return this.http.get<Brand[]>(apiKey.api + `/brand`, {
      headers: this.headers,
    });
  }
  getBrand(brandId: number) {
    return this.http.get<Brand>(apiKey.api + `/brand/${brandId}`, {
      headers: this.headers,
    });
  }
  updateBrand(id: number, brand: Brand) {
    return this.http.put(apiKey.api + `/brand`, brand, {
      headers: this.headers,
    });
  }
  deleteBrand(brandId: number) {
    return this.http.delete(apiKey.api + `/brand/${brandId}`, {
      headers: this.headers,
    });
  }
}
