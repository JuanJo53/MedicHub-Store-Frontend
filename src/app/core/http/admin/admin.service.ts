import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Administrator } from "src/app/shared/models/admin";
import apiKey from "../../apiKey";
import { TokenService } from "../../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  authToken: string;
  headers: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  getAdminDetail(adminId: number) {
    return this.http.get<Administrator>(apiKey.api + `/admin/${adminId}`, {
      headers: this.headers,
    });
  }
  updateAdmin(admin: Administrator) {
    return this.http.put(apiKey.api + `/admin`, admin, {
      headers: this.headers,
    });
  }
}
