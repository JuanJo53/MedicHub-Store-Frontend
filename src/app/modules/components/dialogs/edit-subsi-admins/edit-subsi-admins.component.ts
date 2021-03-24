import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
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
  constructor(
    private fromBuilder: FormBuilder,
    private pharmAdminService: PharmAdminsService,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<EditSubsiAdminsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; subsidiaryId: number }
  ) {}

  ngOnInit() {
    this.fetchAdminDetails(this.data.id);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  fetchAdminDetails(adminId: number) {
    this.pharmAdminService
      .getAdminDetail(adminId)
      .subscribe((administrator) => {
        this.pharmAdmin = administrator;
        // console.log(this.pharmAdmin);
        this.editAdmin();
      });
  }
  editAdmin(): void {
    this.form = this.fromBuilder.group({
      subsidiaryId: [0, [Validators.required]],
      personId: [0, [Validators.required]],
      firstName: ["", [Validators.required, Validators.maxLength(150)]],
      firstSurname: ["", [Validators.required, Validators.maxLength(150)]],
      secondSurname: ["", [Validators.required, Validators.maxLength(150)]],
      ci: ["", [Validators.required, Validators.maxLength(45)]],
      phone: ["", [Validators.required, Validators.maxLength(45)]],
      email: [
        "",
        [Validators.required, Validators.email, Validators.maxLength(150)],
      ],
      userName: ["", [Validators.required, Validators.maxLength(150)]],
      password: ["", [Validators.required, Validators.maxLength(150)]],
    });
    this.form.get("subsidiaryId").setValue(+this.data.subsidiaryId);
    this.form.get("personId").setValue(this.pharmAdmin.pharmacyId);

    // console.log(this.form.value);
  }
  saveAdmin(id: number): void {
    if (this.form.valid) {
      const subsidiary = this.form.value;
      this.updateAdmin(id, subsidiary);
      this.dialogRef.close();
    } else {
      console.log("bad form");
    }
  }
  updateAdmin(id: number, admin: PharmAdmin): void {
    // var iduser = parseInt(localStorage.getItem("userId"));
    this.pharmAdminService.updateAdmins(id, admin).subscribe((admin) => {
      console.log(admin);
    });
  }
}
