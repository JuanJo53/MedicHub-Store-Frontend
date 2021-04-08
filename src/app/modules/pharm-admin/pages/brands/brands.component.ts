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

  notEmptyPost = true;
  notscrolly = true;
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
    });
  }
  onScroll() {
    if (this.notscrolly && this.notEmptyPost) {
      this.notscrolly = false;
      this.loadNextPost();
    }
    console.log("jas");
  }
  loadNextPost() {
    const lastPost = this.brands[this.brands.length - 1];
    // get id of last post
    const lastPostId = lastPost.brandId.toString();
    // sent this id as key value pare using formdata()
    const dataToSend = new FormData();
    dataToSend.append("brandId", lastPostId);
    // call http request
    console.log(lastPost);
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
