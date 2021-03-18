import { PharmacyRequest } from "./../../../shared/models/pharmacy-request";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import apiKey from "../../apiKey";
import { Pharmacy } from "src/app/shared/models/pharmacy";

@Injectable({
  providedIn: "root",
})
export class PharmaciesService {
  constructor(private http: HttpClient) {}

  postNewPharmacy(pharmacy: PharmacyRequest) {
    return this.http.post(apiKey.api + "/pharmacy", pharmacy);
  }
  getAllPharmacies() {
    return this.http.get<Pharmacy[]>(apiKey.api + "/pharmacy");
  }
  getPharmacy(pharmId: number) {
    return this.http.get<Pharmacy>(apiKey.api + "/pharmacy/" + pharmId);
  }
  updatePharmacy(pharmId: number, pharmacy: PharmacyRequest) {
    return this.http.put(apiKey.api + `/pharmacy`, pharmacy);
  }
  deletePharmacy(pharmId: number) {
    return this.http.delete(apiKey.api + `/pharmacy/${pharmId}`);
  }
}
