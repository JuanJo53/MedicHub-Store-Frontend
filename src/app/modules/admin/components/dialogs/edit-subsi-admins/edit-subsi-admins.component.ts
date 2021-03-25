import { TokenService } from "./../../../../../core/authentication/token.service";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PharmAdminsService } from "src/app/core/http/admin/pharm-admins.service";
import { PharmAdmin } from "src/app/shared/models/pharm-admin";

@Component({
  selector: "app-edit-subsi-admins",
  templateUrl: "./edit-subsi-admins.component.html",
  styleUrls: ["./edit-subsi-admins.component.scss"],
})
export class EditSubsiAdminsComponent implements OnInit {
  pharmAdmin: PharmAdmin;
  form: FormGroup;
  subsidiaryId: number;

  constructor(
    private fromBuilder: FormBuilder,
    private pharmAdminService: PharmAdminsService,
    public dialogRef: MatDialogRef<EditSubsiAdminsComponent>,
    private tokenService: TokenService,
    @Inject(MAT_DIALOG_DATA)
    public data: { pharmAdminId: number; subsidiaryId: number }
  ) {}

  ngOnInit() {
    this.fetchAdminDetails(this.data.pharmAdminId);
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  fetchAdminDetails(adminId: number) {
    this.pharmAdminService
      .getAdminDetail(adminId)
      .subscribe((administrator) => {
        this.pharmAdmin = administrator;
        this.editAdmin();
      });
  }
  editAdmin(): void {
    this.subsidiaryId = parseInt(this.tokenService.getUserName());
    this.form = this.fromBuilder.group({
      subsidiaryId: [0, [Validators.required]],
      pharmacyId: [0, [Validators.required]],
      firstName: [
        "",
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      firstSurname: [
        "",
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      secondSurname: [
        "",
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      ci: [
        "",
        [
          Validators.required,
          Validators.maxLength(145),
          Validators.minLength(6),
        ],
      ],
      phone: [
        "",
        [
          Validators.required,
          Validators.maxLength(18),
          Validators.minLength(12),
        ],
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(150),
          Validators.minLength(6),
        ],
      ],
      userName: [
        "",
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(6),
        ],
      ],
    });
    this.form.get("subsidiaryId").setValue(this.data.subsidiaryId);
    this.form.get("pharmacyId").setValue(this.data.pharmAdminId);
    this.form.get("firstName").setValue(this.pharmAdmin.firstName);
    this.form.get("firstSurname").setValue(this.pharmAdmin.firstSurname);
    this.form.get("secondSurname").setValue(this.pharmAdmin.secondSurname);
    this.form.get("ci").setValue(this.pharmAdmin.ci);
    this.form.get("phone").setValue(this.pharmAdmin.phone);
    this.form.get("email").setValue(this.pharmAdmin.email);
    this.form.get("userName").setValue(this.pharmAdmin.userName);
    this.form.get("password").setValue(this.pharmAdmin.password);
    console.log(this.form.value);
  }
  saveAdmin(): void {
    if (this.form.valid) {
      const subsidiary = this.form.value;
      console.log(subsidiary);
      this.updateAdmin(subsidiary);
      this.dialogRef.close(true);
    } else {
      console.log("bad form");
    }
  }
  updateAdmin(admin: PharmAdmin): void {
    this.pharmAdminService.updateAdmins(admin).subscribe((admin) => {
      console.log(admin);
    });
  }
}
