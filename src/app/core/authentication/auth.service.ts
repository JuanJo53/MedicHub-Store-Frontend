import { LoginUser } from "./../../shared/models/login-user";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NewUser } from "src/app/shared/models/new-user";
import apiKey from "../apiKey";
import { JwtDTO } from "src/app/shared/models/jwt-dto";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  authURL = apiKey + "/auth/";

  constructor(private httpClient: HttpClient) {}

  public signUp(newUser: NewUser): Observable<any> {
    return this.httpClient.post<any>(this.authURL + "new", newUser);
  }

  public logIn(logInUsuario: LoginUser): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + "login", logInUsuario);
  }
}
