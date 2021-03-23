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
  getAdmins(subsidId: number) {
    return this.http.get<PharmAdmin[]>(
      apiKey.api + `/subsidiary/${subsidId}/admin`
    );
  }
  updateAdmins(adminId: number, pharmAdmin: PharmAdmin) {
    return this.http.put(apiKey.api + `/subsidiary`, pharmAdmin);
  }
  deleteAdmins(adminId: number) {
    return this.http.delete(apiKey.api + `/subsidiary/${adminId}`);
  }
}
