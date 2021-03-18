import { PharmaciesService } from "src/app/core/http/admin/pharmacies.service";
import { Pharmacy } from "src/app/shared/models/pharmacy";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { PharmacyRequest } from "src/app/shared/models/pharmacy-request";
import { WarningDialogComponent } from "../warning-dialog/warning-dialog.component";

@Component({
  selector: "app-pharmacy",
  templateUrl: "./pharmacy.component.html",
  styleUrls: ["./pharmacy.component.scss"],
})
export class PharmacyComponent implements OnInit, OnDestroy {
  @Input() pharmacy: Pharmacy;

  form: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private pharmaciesService: PharmaciesService,
    public dialog: MatDialog
  ) {}

  edit = false;
  destroyed = false;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      console.log(id);
      if (id) {
        this.fetchPharmacy(id);
      }
    });
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
      email: ["", [Validators.required]],
      // picture: ["", [Validators.required]],
    });
  }
  fetchPharmacy(id: number): void {
    this.pharmaciesService.getPharmacy(id).subscribe((pharmacy) => {
      this.pharmacy = pharmacy;
    });
  }
  savePharmacy(event: Event, id: number): void {
    event.preventDefault();
    if (this.form.valid) {
      const pharm = this.form.value;
      pharm.pharmacyId = id;
      this.updatePharmacy(id, pharm);
    } else {
      console.log("Bad form");
    }
    this.cancel();
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
}
