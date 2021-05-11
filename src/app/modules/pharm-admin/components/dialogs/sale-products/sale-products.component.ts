import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { Product } from "src/app/shared/models/product";

@Component({
  selector: "app-sale-products",
  templateUrl: "./sale-products.component.html",
  styleUrls: ["./sale-products.component.scss"],
})
export class SaleProductsComponent implements OnInit {
  productsList: Product[];
  constructor(
    public dialogRef: MatDialogRef<SaleProductsComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { products: Product[] }
  ) {}

  ngOnInit() {
    this.productsList = this.data.products;
    console.log(this.data.products);
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
