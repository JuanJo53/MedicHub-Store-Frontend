import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "src/app/core/authentication/auth.service";
import { TokenService } from "src/app/core/authentication/token.service";
import { ClientService } from "src/app/core/http/admin/client.service";
import { PasswordRequest } from "src/app/shared/models/passwordRequest";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  id: number;
  role: number;

  constructor(
    private fromBuilder: FormBuilder,
    private passwordService: AuthService,
    private tokenService: TokenService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>
  ) {}

  ngOnInit() {
    try {
      this.id = parseInt(this.tokenService.getUserId());
      this.role = parseInt(this.tokenService.getAuthorities());
      this.editPassword();
    } catch (error) {
      console.error(error);
    }
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  savePassword(): void {
    if (this.form.valid) {
      const password = this.form.value;
      const key = "confirmPassword";
      delete password[key];
      console.log(password);
      this.updatePassword(password);
    } else {
      console.log("bad form");
    }
  }
  updatePassword(password: PasswordRequest): void {
    this.passwordService
      .changePassword(password, this.role)
      .subscribe((response) => {
        console.error(response);
        this.dialogRef.close(response);
      });
  }
  editPassword(): void {
    this.form = this.fromBuilder.group(
      {
        id: [this.id, [Validators.required]],
        oldPassword: ["", [Validators.required]],
        newPassword: [
          "",
          [
            Validators.maxLength(50),
            Validators.minLength(6),
            Validators.compose([Validators.required]),
          ],
        ],
        confirmPassword: [
          "",
          [
            Validators.maxLength(50),
            Validators.minLength(6),
            Validators.compose([Validators.required]),
          ],
        ],
      },
      {
        validator: this.confirmPasswordMatch("newPassword", "confirmPassword"),
      }
    );
  }
  confirmPasswordMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      // console.log(controlName, matchingControlName)
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
