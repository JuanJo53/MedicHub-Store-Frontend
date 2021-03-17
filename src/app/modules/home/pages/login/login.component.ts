import { AuthService } from "./../../../../core/authentication/auth.service";
import { logging } from "protractor";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material";
import { LoginUser } from "src/app/shared/models/login-user";
import { SignupComponent } from "../signup/signup.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLogged = false;
  isLoginFail = false;
  loginUser: LoginUser;

  constructor(
    private fromBuilder: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.form = this.fromBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]],
    });
  }
  login() {
    console.log("login");
    if (this.form.valid) {
      const usr = this.form.value;
      console.log(usr);
      this.loginAdmin(usr);
    }
  }
  loginAdmin(admin: LoginUser) {
    this.authService.logIn(admin);
  }
}
