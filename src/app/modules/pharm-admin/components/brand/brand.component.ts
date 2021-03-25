import { CreateBranchComponent } from "./../dialogs/create-branch/create-branch.component";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { BrandService } from "src/app/core/http/pharm-admin/brand.service";
import { WarningDialogComponent } from "src/app/modules/components/dialogs/warning-dialog/warning-dialog.component";
import { Brand } from "src/app/shared/models/brand";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { ContentObserver } from "@angular/cdk/observers";

@Component({
  selector: "app-brand",
  templateUrl: "./brand.component.html",
  styleUrls: ["./brand.component.scss"],
})
export class BrandComponent implements OnInit {
  @Input() brand: Brand;
  form: FormGroup;

  name: string;
  pharmId: number;

  constructor(
    private fromBuilder: FormBuilder,
    private brandService: BrandService,
    public dialog: MatDialog
  ) {}

  edit = false;
  destroyed = false;
  ngOnInit() {}
  ngOnDestroy(): void {
    this.destroyed = true;
  }
  cancel() {
    this.edit = false;
  }
  editBrand(id: number): void {
    this.edit = true;
    this.form = this.fromBuilder.group({
      pharmacyId: [id, [Validators.required]],
      name: [
        "",
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(2),
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
    });
  }
  saveBrand(event: Event, id: number): void {
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
  updatePharmacy(id: number, updateBrand: Brand): void {
    this.brandService.updateBrand(id, updateBrand).subscribe((response) => {
      console.log("Response: " + response);
      this.displaySuccesDialog("¡Marca actualizada exitosamente!");
    });
  }
  deleteBrand(id: number): void {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: "500px",
      data: {
        message: "¿Esta seguro que desea eliminar la marca?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(id);
      if (result) {
        this.brandService.deleteBrand(id).subscribe((rta) => {
          console.log("Response " + rta);
          this.displaySuccesDialog("¡Marca eliminada exitosamente!");
        });
        this.ngOnDestroy();
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
