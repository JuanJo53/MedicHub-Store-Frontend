import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Brand } from "src/app/shared/models/brand";
import apiKey from "../../apiKey";
import { TokenService } from "../../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class BrandService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}
  postNewBrand(brand: Brand) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.post(apiKey.api + "/brand", brand, { headers: headers });
  }
  getBrands() {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.get<Brand[]>(apiKey.api + `/brand`, { headers: headers });
  }
  getBrand(brandId: number) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.get<Brand>(apiKey.api + `/brand/${brandId}`, {
      headers: headers,
    });
  }
  updateBrand(id: number, brand: Brand) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.put(apiKey.api + `/brand`, brand, { headers: headers });
  }
  deleteBrand(brandId: number) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.delete(apiKey.api + `/brand/${brandId}`, {
      headers: headers,
    });
  }
}
