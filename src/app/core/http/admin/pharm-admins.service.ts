import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PharmAdmin } from "src/app/shared/models/pharm-admin";
import { PharmAdminList } from "src/app/shared/models/pharm-admin-list";
import apiKey from "../../apiKey";
import { TokenService } from "../../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class PharmAdminsService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}
  postNewAdmin(newAdmin: PharmAdmin) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.post(apiKey.api + "/pharmacyAdmin", newAdmin);
  }
  getAdmins(subsidId: number) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.get<PharmAdminList[]>(
      apiKey.api + `/subsidiary/${subsidId}/admin`,
      { headers: headers }
    );
  }
  getAdminDetail(adminId: number) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.get<PharmAdmin>(apiKey.api + `/pharmacyAdmin/${adminId}`, {
      headers: headers,
    });
  }
  updateAdmins(adminId: number, pharmAdmin: PharmAdmin) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.put(apiKey.api + `/pharmacyAdmin`, pharmAdmin, {
      headers: headers,
    });
  }
  deleteAdmins(adminId: number) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.delete(apiKey.api + `/pharmacyAdmin/${adminId}`, {
      headers: headers,
    });
  }
}
