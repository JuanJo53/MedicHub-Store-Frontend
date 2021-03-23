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
  subsidiaryId: number;
  constructor(
    private fromBuilder: FormBuilder,
    private pharmAdminService: PharmAdminsService,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<EditSubsiAdminsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit() {
    this.subsidiaryId = this.activatedRoute.snapshot.params.id;
    this.fetchAdminDetails(this.data.id);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  fetchAdminDetails(adminId) {
    this.pharmAdminService
      .getAdminDetail(adminId)
      .subscribe((administrator) => {
        this.pharmAdmin = administrator;
        console.log(this.pharmAdmin);
        this.editAdmin();
      });
  }
  editAdmin(): void {
    this.form = this.fromBuilder.group({
      subsidiaryId: [0, [Validators.required]],
      rolUserId: [0, [Validators.required]],
      firstName: ["", [Validators.required]],
      firstSurname: ["", [Validators.required]],
      secondSurname: ["", [Validators.required]],
      ci: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
    this.form.get("subsidiaryId").setValue(this.subsidiaryId);
    this.form.get("rolUserId").setValue(this.pharmAdmin.rolUserId);
    this.form.get("firstName").setValue(this.pharmAdmin.firstName);
    this.form.get("firstSurname").setValue(this.pharmAdmin.firstSurname);
    this.form.get("secondSurname").setValue(this.pharmAdmin.secondSurname);
    this.form.get("ci").setValue(this.pharmAdmin.ci);
    this.form.get("phone").setValue(this.pharmAdmin.phone);
    this.form.get("email").setValue(this.pharmAdmin.email);
    this.form.get("userName").setValue(this.pharmAdmin.userName);
    this.form.get("password").setValue(this.pharmAdmin.password);
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
