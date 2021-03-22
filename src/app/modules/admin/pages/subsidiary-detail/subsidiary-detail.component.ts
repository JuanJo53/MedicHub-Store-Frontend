import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { PharmAdminsService } from "src/app/core/http/admin/pharm-admins.service";
import { SubsidiariesService } from "src/app/core/http/admin/subsidiaries.service";
import { CreateSubsiAdminComponent } from "src/app/modules/components/dialogs/create-subsi-admin/create-subsi-admin.component";
import { PharmAdmin } from "src/app/shared/models/pharm-admin";
import { Subsidiary } from "src/app/shared/models/subsidiary";
import { SubsidiaryRequest } from "src/app/shared/models/subsidiary-request";

@Component({
  selector: "app-subsidiary-detail",
  templateUrl: "./subsidiary-detail.component.html",
  styleUrls: ["./subsidiary-detail.component.scss"],
})
export class SubsidiaryDetailComponent implements OnInit {
  @Input() subsidiary: SubsidiaryRequest;

  admins: PharmAdmin[] = [];
  text: string;
  id: number;
  form: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private subsidiariesService: SubsidiariesService,
    private pharmAdminsService: PharmAdminsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    try {
      if (this.id) {
        this.editSubsidiary(this.id);
        this.getDetails(this.id);
        this.getAdmins(this.id);
      }
    } catch (error) {
      console.error(error);
    }
  }
  getDetails(id: number) {
    this.subsidiariesService
      .getSpecificSubsidiary(id)
      .subscribe((subsidiary) => {
        this.subsidiary = subsidiary;
        console.log(subsidiary);
      });
  }
  getAdmins(id: number) {
    this.admins = [];
    this.pharmAdminsService.getAdmins(id).subscribe((administrator) => {
      administrator.map((admin) => {
        this.admins.push(admin);
      });
    });
    console.log(this.admins);
  }
  saveAddress(event: Event, id: number): void {
    event.preventDefault();
    if (this.form.valid) {
      const pharm = this.form.value;
      pharm.pharmacyId = id;
      // this.updatePharmacy(id, pharm);
      // this.cancel();
    } else {
      console.log("Bad form");
    }
  }
  editSubsidiary(id: number): void {
    this.form = this.fromBuilder.group({
      pharmacyId: [0, [Validators.required]],
      subsidiaryName: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      number: ["", [Validators.required]],
      street: ["", [Validators.required]],
      zone: ["", [Validators.required]],
      city: ["", [Validators.required]],
      country: ["", [Validators.required]],
    });
    this.form.get("pharmacyId").setValue(id);
  }
  addAdmin() {
    const dialogRef = this.dialog.open(CreateSubsiAdminComponent, {
      width: "500px",
      data: {
        id: this.id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.text = result;
      this.ngOnInit();
    });
  }
}
