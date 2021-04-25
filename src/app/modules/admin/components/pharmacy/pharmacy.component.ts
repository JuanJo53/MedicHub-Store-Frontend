import { SubsidiaryListRequest } from "./../../../../shared/models/subsidiary-list-request";
import { CreateSubsidiaryComponent } from "../dialogs/create-subsidiary/create-subsidiary.component";
import { PharmaciesService } from "src/app/core/http/admin/pharmacies.service";
import { Pharmacy } from "src/app/shared/models/pharmacy";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PharmacyRequest } from "src/app/shared/models/pharmacy-request";
import { WarningDialogComponent } from "../../../components/dialogs/warning-dialog/warning-dialog.component";
import { SubsidiariesService } from "src/app/core/http/admin/subsidiaries.service";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";

@Component({
  selector: "app-pharmacy",
  templateUrl: "./pharmacy.component.html",
  styleUrls: ["./pharmacy.component.scss"],
})
export class PharmacyComponent implements OnInit, OnDestroy {
  @Input() pharmacy: Pharmacy;
  subsidiaries: SubsidiaryListRequest[] = [];

  form: FormGroup;
  text: string;
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
    this.pharmId = this.pharmacy.pharmacyId;
    if (this.pharmId) {
      this.fetchSubsidiaries(this.pharmId);
    }
  }
  ngOnDestroy(): void {
    this.destroyed = true;
  }
  cancel() {
    this.edit = false;
  }
  editPharm(id: number): void {
    this.edit = true;
    this.form = this.fromBuilder.group({
      pharmacyId: [0, [Validators.required]],
      name: [
        "",
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(8),
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
      // picture: ["", [Validators.required]],
    });
  }
  fetchSubsidiaries(id: number): void {
    this.subsidiaries = [];
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
    } else {
      console.log("Bad form");
    }
    this.cancel();
  }
  updatePharmacy(id: number, updatePharmacy: PharmacyRequest): void {
    this.pharmaciesService
      .updatePharmacy(id, updatePharmacy)
      .subscribe((response) => {
        console.log("Response PUT: " + response);
        this.displaySuccesDialog("¡Se actualizó la farmacia exitosamente!");
        this.fetchSubsidiaries(this.pharmId);
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
      console.log(id);
      if (result) {
        this.pharmaciesService.deletePharmacy(id).subscribe((rta) => {
          console.log("Response " + rta);
          this.text = result;
          this.displaySuccesDialog("¡Se elimino la farmacia exitosamente!");
          this.ngOnDestroy();
        });
      }
    });
  }
  addSubsidiary() {
    const dialogRef = this.dialog.open(CreateSubsidiaryComponent, {
      width: "500px",
      data: {
        id: this.pharmacy.pharmacyId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "OK") {
        console.log("Resultado post:" + result);
        this.displaySuccesDialog("¡Se agrego la sucursal exitosamente!");
        this.fetchSubsidiaries(this.pharmId);
      }
    });
  }
  displaySuccesDialog(text: string) {
    this.dialog.open(SuccesDialogComponent, {
      width: "500px",
      data: {
        message: text,
      },
    });
  }
}
