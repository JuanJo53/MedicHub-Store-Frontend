import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "src/app/core/http/pharm-admin/products.service";
import { Product } from "src/app/shared/models/product";
import { CartService } from "src/app/core/services/cart.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: number;
  constructor(
    private productsServide: ProductsService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
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
    console.log("añadir al carrito");
    this.cartService.addCart(this.product);
    // this.productClicked.emit(this.product.id);
  }
}
