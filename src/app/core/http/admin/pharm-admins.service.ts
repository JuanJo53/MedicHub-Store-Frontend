import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PharmAdmin } from "src/app/shared/models/pharm-admin";
import apiKey from "../../apiKey";

@Injectable({
  providedIn: "root",
})
export class PharmAdminsService {
  constructor(private http: HttpClient) {}
  postNewAdmin(newAdmin: PharmAdmin) {
    return this.http.post(apiKey.api + "/pharmacyAdmin", newAdmin);
  }
}
