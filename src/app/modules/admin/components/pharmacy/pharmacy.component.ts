import { SubsidiaryListRequest } from "./../../../../shared/models/subsidiary-list-request";
import { CreateSubsidiaryComponent } from "./../../../components/dialogs/create-subsidiary/create-subsidiary.component";
import { PharmaciesService } from "src/app/core/http/admin/pharmacies.service";
import { Pharmacy } from "src/app/shared/models/pharmacy";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PharmacyRequest } from "src/app/shared/models/pharmacy-request";
import { WarningDialogComponent } from "../warning-dialog/warning-dialog.component";
import { SubsidiariesService } from "src/app/core/http/admin/subsidiaries.service";

@Component({
  selector: "app-pharmacy",
  templateUrl: "./pharmacy.component.html",
  styleUrls: ["./pharmacy.component.scss"],
})
export class PharmacyComponent implements OnInit, OnDestroy {
  @Input() pharmacy: Pharmacy;
  subsidiaries: SubsidiaryListRequest[] = [];

  form: FormGroup;

  name: string;
  pharmId: number;

  constructor(
    private fromBuilder: FormBuilder,
    private pharmaciesService: PharmaciesService,
    private subsidiariesService: SubsidiariesService,
    public dialog: MatDialog
  ) {}

  edit = false;
  destroyed = false;

  ngOnInit() {
    const id = this.pharmacy.pharmacyId;
    if (id) {
      this.fetchSubsidiaries(id);
    }
  }
  ngOnDestroy(): void {
    this.destroyed = true;
  }
  cancel() {
    this.edit = false;
  }
  editPharm(): void {
    this.edit = true;
    this.form = this.fromBuilder.group({
      pharmacyId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      // picture: ["", [Validators.required]],
    });
  }
  fetchSubsidiaries(id: number): void {
    this.subsidiariesService.getSubsidiaries(id).subscribe((subsidiary) => {
      subsidiary.map((sub) => {
        this.subsidiaries.push(sub);
      });
    });
  }
  savePharmacy(event: Event, id: number): void {
    event.preventDefault();
    if (this.form.valid) {
      const pharm = this.form.value;
      pharm.pharmacyId = id;
      this.updatePharmacy(id, pharm);
      this.cancel();
    } else {
      console.log("Bad form");
    }
  }
  updatePharmacy(id: number, updatePharmacy: PharmacyRequest): void {
    this.pharmaciesService
      .updatePharmacy(id, updatePharmacy)
      .subscribe((pharmacy) => {
        console.log("Farmacia: ");
        console.log(pharmacy);
      });
  }
  deletePharmacy(id: number): void {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: "500px",
      data: {
        message: "¿Esta seguro que desea eliminar la farmacia?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pharmaciesService.deletePharmacy(id).subscribe((rta) => {
          console.log("Resultado " + rta);
        });
        console.log("Deleted");
        this.ngOnDestroy();
      }
    });
  }
  addSubsidiary() {
    const dialogRef = this.dialog.open(CreateSubsidiaryComponent, {
      width: "500px",
      data: {
        name: this.name,
        id: this.pharmacy.pharmacyId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.name = result;
      this.ngOnInit();
    });
  }
}
