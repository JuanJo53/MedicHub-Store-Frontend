import { LoginUser } from "./../../shared/models/login-user";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Client } from "src/app/shared/models/client";
import apiKey from "../apiKey";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  authURL = apiKey.api + "/oauth/token";

  constructor(private httpClient: HttpClient) {}

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
}
