import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PasswordRequest } from "src/app/shared/models/passwordRequest";
import { PharmAdmin } from "src/app/shared/models/pharm-admin";
import { PharmAdminList } from "src/app/shared/models/pharm-admin-list";
import apiKey from "../../apiKey";
import { TokenService } from "../../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class PharmAdminsService {
  authToken: string;
  headers: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  postNewAdmin(newAdmin: PharmAdmin) {
    return this.http.post(apiKey.api + "/pharmacyAdmin", newAdmin, {
      headers: this.headers,
    });
  }
  getAdmins(
    subsidId: number,
    page: number,
    size: number,
    order: string,
    asc: boolean
  ): Observable<any> {
    return this.http.get<PharmAdminList[]>(
      apiKey.api +
        `/subsidiary/${subsidId}/admin?page=${page}&size=${size}&order=${order}&asc=${asc}`,
      { headers: this.headers }
    );
  }
  getAdminDetail(adminId: number) {
    return this.http.get<PharmAdmin>(apiKey.api + `/pharmacyAdmin/${adminId}`, {
      headers: this.headers,
    });
  }
  updateAdmins(pharmAdmin: PharmAdmin) {
    return this.http.put(apiKey.api + `/pharmacyAdmin`, pharmAdmin, {
      headers: this.headers,
    });
  }
  deleteAdmins(adminId: number) {
    return this.http.delete(apiKey.api + `/pharmacyAdmin/${adminId}`, {
      headers: this.headers,
    });
  }
  changePassword(password: PasswordRequest) {
    return this.http.put(apiKey.api + `/pharmacyAdmin`, password, {
      headers: this.headers,
    });
  }
}
