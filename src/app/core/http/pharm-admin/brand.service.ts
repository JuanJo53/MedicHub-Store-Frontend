import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Brand } from "src/app/shared/models/brand";
import apiKey from "../../apiKey";

@Injectable({
  providedIn: "root",
})
export class BrandService {
  constructor(private http: HttpClient) {}
  postNewBrand(brand: Brand) {
    return this.http.post(apiKey.api + "/brand", brand);
  }
  getBrands() {
    return this.http.get<Brand[]>(apiKey.api + `/brand`);
  }
  getBrand(brandId: number) {
    return this.http.get<Brand>(apiKey.api + `/brand/${brandId}`);
  }
  updateBrand(id: number, brand: Brand) {
    return this.http.put(apiKey.api + `/brand`, brand);
  }
  deleteBrand(brandId: number) {
    return this.http.delete(apiKey.api + `/brand/${brandId}`);
  }
}
