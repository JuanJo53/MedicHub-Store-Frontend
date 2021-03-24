import { PharmAdminsService } from "./../../../../core/http/admin/pharm-admins.service";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SubsidiariesService } from "src/app/core/http/admin/subsidiaries.service";
import { PharmAdmin } from "src/app/shared/models/pharm-admin";

@Component({
  selector: "app-create-subsi-admin",
  templateUrl: "./create-subsi-admin.component.html",
  styleUrls: ["./create-subsi-admin.component.scss"],
})
export class CreateSubsiAdminComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    private pharmAdminService: PharmAdminsService,
    public dialogRef: MatDialogRef<CreateSubsiAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit() {
    this.editAdmin();
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  editAdmin(): void {
    this.form = this.fromBuilder.group({
      subsidiaryId: [0, [Validators.required]],
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
    this.form.get("subsidiaryId").setValue(this.data.id);
  }
  saveAdmin(): void {
    if (this.form.valid) {
      const subsidiary = this.form.value;
      this.createAdmin(subsidiary);
      this.dialogRef.close(true);
    } else {
      console.log("bad form");
    }
  }
  createAdmin(newAdmin: PharmAdmin): void {
    // var iduser = parseInt(localStorage.getItem("userId"));
    this.pharmAdminService.postNewAdmin(newAdmin).subscribe((admin) => {
      console.log(admin);
    });
  }
}
