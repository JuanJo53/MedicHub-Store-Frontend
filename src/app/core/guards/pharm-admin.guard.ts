import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { TokenService } from "../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class PharmAdminGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  redirect(flag: boolean): any {
    if (!flag) {
      this.router.navigate(["/", "login"]);
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const role = parseInt(this.tokenService.getAuthorities());
    if (role == 2) {
      this.redirect(true);
      return true;
    } else {
      this.redirect(false);
      return false;
    }
  }
}
