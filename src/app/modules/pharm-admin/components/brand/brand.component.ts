import { CreateBranchComponent } from "./../dialogs/create-branch/create-branch.component";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { BrandService } from "src/app/core/http/pharm-admin/brand.service";
import { WarningDialogComponent } from "src/app/modules/admin/components/warning-dialog/warning-dialog.component";
import { Brand } from "src/app/shared/models/brand";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";

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
  ngOnInit() {
    const id = this.brand.brandId;
    if (id) {
      // this.fetchSubsidiaries(id);
    }
  }
  ngOnDestroy(): void {
    this.destroyed = true;
  }
  cancel() {
    this.edit = false;
  }
  editBrand(id: number): void {
    this.edit = true;
    this.form = this.fromBuilder.group({
      pharmacyId: [0, [Validators.required]],
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
        });
        this.ngOnDestroy();
      }
    });
  }
  addSubsidiary() {
    const dialogRef = this.dialog.open(CreateBranchComponent, {
      width: "500px",
      data: {
        name: this.name,
        id: this.brand.brandId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.name = result;
      this.ngOnInit();
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
