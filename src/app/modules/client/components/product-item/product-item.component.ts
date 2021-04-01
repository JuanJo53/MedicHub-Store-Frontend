import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { TokenService } from "src/app/core/authentication/token.service";
import { BrandService } from "src/app/core/http/pharm-admin/brand.service";
import { ProductsService } from "src/app/core/http/pharm-admin/products.service";
import { Product } from "src/app/shared/models/product";

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  subsidiaryId: number;

  edit = false;
  destroyed = false;

  constructor(
    private productsServide: ProductsService,
    private brandsService: BrandService,
    private tokenService: TokenService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const id = this.product.productId;
    if (id) {
      this.fetchProduct(id);
    }
  }

  fetchProduct(id: number): void {
    this.productsServide.getProduct(id).subscribe((product) => {
      this.product = product;
    });
  }
}
