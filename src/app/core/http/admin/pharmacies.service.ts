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
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  postNewPharmacy(pharmacy: PharmacyRequest) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.post(apiKey.api + "/pharmacy", pharmacy, {
      headers: headers,
    });
  }
  getAllPharmacies() {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.get<Pharmacy[]>(apiKey.api + "/pharmacy", {
      headers: headers,
    });
  }
  getPharmacy(pharmId: number) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.get<Pharmacy>(apiKey.api + "/pharmacy/" + pharmId, {
      headers: headers,
    });
  }
  updatePharmacy(pharmId: number, pharmacy: PharmacyRequest) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.put(apiKey.api + `/pharmacy`, pharmacy, {
      headers: headers,
    });
  }
  deletePharmacy(pharmId: number) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.delete(apiKey.api + `/pharmacy/${pharmId}`, {
      headers: headers,
    });
  }
}
