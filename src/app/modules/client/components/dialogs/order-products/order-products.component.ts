import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { Product } from "src/app/shared/models/product";

@Component({
  selector: "app-order-products",
  templateUrl: "./order-products.component.html",
  styleUrls: ["./order-products.component.scss"],
})
export class OrderProductsComponent implements OnInit {
  productsList: Product[];
  constructor(
    public dialogRef: MatDialogRef<OrderProductsComponent>,
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
