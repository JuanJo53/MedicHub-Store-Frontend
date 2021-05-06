import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "src/app/core/http/pharm-admin/products.service";
import { Product } from "src/app/shared/models/product";
import { CartService } from "src/app/core/services/cart.service";
import { Location } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { OrderService } from "src/app/core/http/client/order.service";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { DomSanitizer } from "@angular/platform-browser";
import { FileService } from "src/app/core/services/file.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: number;
  image: any;
  quantity?: number;

  constructor(
    private productsServide: ProductsService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private orderService: OrderService,
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    private _location: Location,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    try {
      this.id = this.activatedRoute.snapshot.params.pid;
      if (this.id) {
        this.fetchProduct(this.id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  fetchProduct(id: number): void {
    this.productsServide.getProduct(id).subscribe((product) => {
      this.product = product;
      console.log(product);
      console.log(this.product.picture);
      this.fetchProductPhoto();
    });
  }
  fetchProductPhoto() {
    this.fileService.getUserPhoto(this.product.picture).subscribe((data) => {
      let objectURL = URL.createObjectURL(data);
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
  displaySuccesDialog(text: string) {
    const dialogRef = this.dialog.open(SuccesDialogComponent, {
      width: "500px",
      data: {
        message: text,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      window.location.reload();
    });
  }
  addCart() {
    if (this.quantity) {
      for (let i = 0; i < this.quantity; i++) {
        this.cartService.addCart(this.product);
      }
      this.product.quantity = this.quantity;
      console.log(this.product);
      this.orderService.postNewOrderItem(this.product).subscribe((response) => {
        console.log(response);
      });
    }
    this._snackBar.open("Agregado a carrito de compras", "OK", {
      duration: 3000,
    });
  }
  backClicked() {
    this._location.back();
  }
}
