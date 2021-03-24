import { LoginUser } from "./../../shared/models/login-user";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NewUser } from "src/app/shared/models/new-user";
import apiKey from "../apiKey";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  authURL = apiKey.api + "/auth";

  constructor(private httpClient: HttpClient) {}

  public signUp(newUser: NewUser): Observable<any> {
    return this.httpClient.post<any>(this.authURL + "new", newUser);
  }

  public logIn(logInUser: LoginUser): Observable<any> {
    return this.httpClient.post<any>(this.authURL, logInUser);
  }
}
