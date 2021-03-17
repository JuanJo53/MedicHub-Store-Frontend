import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material";
import { SignupComponent } from "../signup/signup.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fromBuilder: FormBuilder) {}
  onNoClick(): void {
    // this.dialogRef.close();
  }
  ngOnInit(): void {
    console.log("login");
    this.form = this.fromBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]],
    });
    console.log("login");
  }
  signup() {
    // const dialogRef = this.dialog.open(SignupComponent, {
    //   width: "1000px",
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   this.ngOnInit();
    // });
  }
  login() {
    console.log("login");
    if (this.form.valid) {
      const usr = this.form.value;
      console.log(usr);
    }
  }
}
