import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PharmAdmin } from "src/app/shared/models/pharm-admin";
import { PharmAdminList } from "src/app/shared/models/pharm-admin-list";
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
    return this.http.get<PharmAdminList[]>(
      apiKey.api + `/subsidiary/${subsidId}/admin`
    );
  }
  updateAdmins(adminId: number, pharmAdmin: PharmAdmin) {
    return this.http.put(apiKey.api + `/pharmacyAdmin`, pharmAdmin);
  }
  deleteAdmins(adminId: number) {
    return this.http.delete(apiKey.api + `/pharmacyAdmin/${adminId}`);
  }
}
