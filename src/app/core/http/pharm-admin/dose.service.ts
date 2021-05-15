import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Dose } from "src/app/shared/models/dose";
import apiKey from "../../apiKey";
import { TokenService } from "../../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class DoseService {
  authToken: string;
  headers: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }
  getDoseTypes() {
    return this.http.get<Dose[]>(apiKey.api + `/doseType`, {
      headers: this.headers,
    });
  }
}
