import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

const TOKEN_KEY = "AuthToken";
const USERNAME_KEY = "AuthUserName";
const USERID_KEY = "UserId";
const SUBSIDIARY_KEY = "SubsidiaryId";
const AUTHORITIES_KEY = "AuthAuthorities";
@Injectable({
  providedIn: "root",
})
export class TokenService {
  roles: Array<string> = [];

  constructor(private router: Router) {}

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }
  public getUserName(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }
  public setUserId(userId: string): void {
    window.sessionStorage.removeItem(USERID_KEY);
    window.sessionStorage.setItem(USERID_KEY, userId);
  }
  public getUserId(): string {
    return sessionStorage.getItem(USERID_KEY);
  }

  public setSubsidiaryId(subsidiaryId: string): void {
    window.sessionStorage.removeItem(SUBSIDIARY_KEY);
    window.sessionStorage.setItem(SUBSIDIARY_KEY, subsidiaryId);
  }
  public getSubsidiaryId(): string {
    return sessionStorage.getItem(SUBSIDIARY_KEY);
  }

  public setAuthorities(authorities: number): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, authorities.toString());
  }
  public getAuthorities(): string {
    return sessionStorage.getItem(AUTHORITIES_KEY);
  }

  public logOut(): void {
    window.sessionStorage.clear();
    this.router.navigate(["/login"]);
  }
}
