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
    this.form.controls["subsidiaryId"].setErrors({ incorrect: true });
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
    this.subsidiaryId = parseInt(this.tokenService.getSubsidiaryId());
    this.form = this.fromBuilder.group({
      subsidiaryId: [this.data.subsidiaryId, [Validators.required]],
      pharmacyAdminId: [this.data.pharmAdminId, [Validators.required]],
      firstName: [
        this.pharmAdmin.firstName,
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      firstSurname: [
        this.pharmAdmin.firstSurname,
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      secondSurname: [
        this.pharmAdmin.secondSurname,
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      ci: [
        this.pharmAdmin.ci,
        [
          Validators.required,
          Validators.maxLength(145),
          Validators.minLength(6),
        ],
      ],
      phone: [
        this.pharmAdmin.phone,
        [
          Validators.required,
          Validators.maxLength(18),
          Validators.minLength(12),
        ],
      ],
      email: [
        this.pharmAdmin.email,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(150),
          Validators.minLength(6),
        ],
      ],
      userName: [
        this.pharmAdmin.userName,
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
    });
    console.log(this.form.value);
  }
  saveAdmin(): void {
    console.log(this.form.value);
    if (this.form.valid) {
      const subsidiary = this.form.value;
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
