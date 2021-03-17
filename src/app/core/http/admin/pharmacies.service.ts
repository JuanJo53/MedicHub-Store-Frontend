import { PharmacyRequest } from "./../../../shared/models/pharmacy-request";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import apiKey from "../../apiKey";

@Injectable({
  providedIn: "root",
})
export class PharmaciesService {
  constructor(private http: HttpClient) {}

  postNewPharmacy(pharmacy: PharmacyRequest) {
    return this.http.post(apiKey.api + "/pharmacy", pharmacy);
  }
}
