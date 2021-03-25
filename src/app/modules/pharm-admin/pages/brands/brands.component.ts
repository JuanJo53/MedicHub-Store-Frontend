import { CreateBranchComponent } from "./../../components/dialogs/create-branch/create-branch.component";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BrandService } from "src/app/core/http/pharm-admin/brand.service";
import { Brand } from "src/app/shared/models/brand";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";

@Component({
  selector: "app-brands",
  templateUrl: "./brands.component.html",
  styleUrls: ["./brands.component.scss"],
})
export class BrandsComponent implements OnInit {
  brands: Brand[] = [];
  id: number;
  name: string;
  constructor(public dialog: MatDialog, private brandsService: BrandService) {}

  ngOnInit() {
    console.log("OnInit excecuted");
    this.fecthBrands();
  }
  addBrand(): void {
    const dialogRef = this.dialog.open(CreateBranchComponent, {
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.displaySuccesDialog("¡Marca agregada exitosamente!");
        this.ngOnInit();
      }
    });
  }
  fecthBrands(): void {
    this.brandsService.getBrands().subscribe((bands) => {
      this.brands = bands;
      console.log(bands);
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
