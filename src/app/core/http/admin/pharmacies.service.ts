import { PharmacyRequest } from "./../../../shared/models/pharmacy-request";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import apiKey from "../../apiKey";
import { Pharmacy } from "src/app/shared/models/pharmacy";
import { TokenService } from "../../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class PharmaciesService {
  authToken: string;
  headers: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  postNewPharmacy(pharmacy: PharmacyRequest) {
    return this.http.post(apiKey.api + "/pharmacy", pharmacy, {
      headers: this.headers,
    });
  }
  getAllPharmacies() {
    return this.http.get<Pharmacy[]>(apiKey.api + "/pharmacy", {
      headers: this.headers,
    });
  }
  getPharmacy(pharmId: number) {
    return this.http.get<Pharmacy>(apiKey.api + "/pharmacy/" + pharmId, {
      headers: this.headers,
    });
  }
  updatePharmacy(pharmId: number, pharmacy: PharmacyRequest) {
    return this.http.put(apiKey.api + `/pharmacy`, pharmacy, {
      headers: this.headers,
    });
  }
  deletePharmacy(pharmId: number) {
    return this.http.delete(apiKey.api + `/pharmacy/${pharmId}`, {
      headers: this.headers,
    });
  }
}
