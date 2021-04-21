import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "src/app/core/http/pharm-admin/products.service";
import { Product } from "src/app/shared/models/product";
import { CartService } from "src/app/core/services/cart.service";
import { Location } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: number;

  quantity?: number;

  constructor(
    private productsServide: ProductsService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private _location: Location,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.pid;
    if (this.id) {
      this.fetchProduct(this.id);
    }
  }

  fetchProduct(id: number): void {
    this.productsServide.getProduct(id).subscribe((product) => {
      this.product = product;
      console.log(product);
    });
  }
  addCart() {
    if (this.quantity) {
      for (let i = 0; i < this.quantity; i++) {
        this.cartService.addCart(this.product);
      }
    }
    this._snackBar.open("Agregado a carrito de compras", "OK", {
      duration: 3000,
    });
  }
  backClicked() {
    this._location.back();
  }
}
