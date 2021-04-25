import { LoginUser } from "./../../shared/models/login-user";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Client } from "src/app/shared/models/client";
import apiKey from "../apiKey";
import { PasswordRequest } from "src/app/shared/models/passwordRequest";
import { TokenService } from "./token.service";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  authURL = apiKey.api + "/oauth/token";

  authToken: string;
  headers: any;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  public signUp(newUser: Client): Observable<any> {
    return this.httpClient.post<any>(this.authURL + "new", newUser);
  }

  public logIn(logInUser: LoginUser): Observable<any> {
    const credenciales = btoa("medichubapp" + ":" + "medichubastore12345");
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + credenciales,
    });

    let params = new URLSearchParams();
    params.set("grant_type", "password");
    params.set("username", logInUser.email);
    params.set("password", logInUser.password);
    var userParams = params.toString().replace(/%40/gi, "@");

    return this.httpClient.post<any>(this.authURL, userParams, {
      headers: httpHeaders,
    });
  }
  changePassword(password: PasswordRequest, role: number, userId: number) {
    console.log(role);
    if (role == 1) {
      return this.httpClient.put(apiKey.api + `/admin`, password, {
        headers: this.headers,
      });
    } else if (role == 2) {
      return this.httpClient.put(
        apiKey.api + `/pharmacyAdmin/password`,
        password,
        {
          headers: this.headers,
        }
      );
    } else {
      return this.httpClient.put(
        apiKey.api + `/client/updatepassword`,
        password,
        {
          headers: this.headers,
        }
      );
    }
  }
}
