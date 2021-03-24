import { CreateBranchComponent } from "./../../components/dialogs/create-branch/create-branch.component";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { BrandService } from "src/app/core/http/pharm-admin/brand.service";
import { Brand } from "src/app/shared/models/brand";

@Component({
  selector: "app-brands",
  templateUrl: "./brands.component.html",
  styleUrls: ["./brands.component.scss"],
})
export class BrandsComponent implements OnInit {
  brands: Brand[] = [];
  id: number;
  name: string;
  constructor(
    public dialog: MatDialog,
    private brandsService: BrandService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    console.log("OnInit excecuted");
    this.fecthBrands();
  }
  addBrand(): void {
    const dialogRef = this.dialog.open(CreateBranchComponent, {
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.name = result;
      this.ngOnInit();
    });
  }
  fecthBrands(): void {
    this.brandsService.getBrands().subscribe((bands) => {
      this.brands = bands;
      console.log(bands);
    });
  }
}
