import { TokenService } from "src/app/core/authentication/token.service";
import { AuthService } from "./../../../../core/authentication/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginUser } from "src/app/shared/models/login-user";
import { Router } from "@angular/router";
import { stringify } from "@angular/compiler/src/util";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  isLogged = false;
  isLoginFail = false;
  roles: number;

  loginUser: LoginUser;

  errMsj: string;

  constructor(
    private fromBuilder: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
    }
    this.form = this.fromBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      // role: [""],
    });
  }
  login() {
    if (this.form.valid) {
      const usr = this.form.value;
      // this.tokenService.setAuthorities(this.form.get("role").value);
      this.onLogin(usr);
    }
  }
  onLogin(user: LoginUser) {
    this.roles = parseInt(this.tokenService.getAuthorities());
    this.authService.logIn(user).subscribe(
      (data) => {
        this.isLogged = true;
        this.isLoginFail = false;
        console.log(data);

        this.tokenService.setToken(data.access_token);
        if (data.clientId) {
          this.tokenService.setUserName(data.clientId);
        } else if (data.adminId) {
          this.tokenService.setUserName(data.adminId);
        } else if (data.pharmAdminId) {
          this.tokenService.setSubsidiaryId(data.subsidiaryId);
          this.tokenService.setUserName(data.pharmAdminId);
        }

        this.tokenService.setAuthorities(data.role);
        this.roles = parseInt(this.tokenService.getAuthorities());

        if (this.roles == 1) {
          this.router.navigate(["/admin/dashboard"]);
        } else if (this.roles == 2) {
          this.router.navigate(["/pharmAdmin/dashboard"]);
        } else if (this.roles == 3) {
          this.router.navigate(["/client/home"]);
        }
      },
      (err) => {
        this.isLogged = false;
        this.isLoginFail = true;
      }
    );
  }
}
