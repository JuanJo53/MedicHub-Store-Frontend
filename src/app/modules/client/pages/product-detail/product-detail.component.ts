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
import { TokenService } from "src/app/core/authentication/token.service";
import { NewProductOrder } from "src/app/shared/models/new-product-order";
import { EventEmitterService } from "src/app/core/services/event-emitter.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  orderProduct: Product;
  id: number;
  image: any;
  quantity?: number;

  constructor(
    private productsServide: ProductsService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private fileService: FileService,
    private tokenService: TokenService,
    private sanitizer: DomSanitizer,
    private eventEmitterService: EventEmitterService,
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
      this.fetchProductPhoto();
    });
  }
  fetchProductPhoto() {
    this.fileService.getUserPhoto(this.product.picture).subscribe((data) => {
      let objectURL = URL.createObjectURL(data);
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
  addCart() {
    if (this.quantity) {
      this.product.quantity = this.quantity;
      this.orderProduct = this.product;
      delete this.orderProduct["brandId"];
      delete this.orderProduct["name"];
      delete this.orderProduct["brandName"];
      delete this.orderProduct["description"];
      delete this.orderProduct["dose"];
      delete this.orderProduct["price"];
      delete this.orderProduct["picture"];
      delete this.orderProduct["stock"];
      delete this.orderProduct["subsidiaryId"];
      delete this.orderProduct["total"];
      this.orderProduct["quantity"] = this.product.quantity;
      this.orderProduct["productId"] = this.product.productId;
      this.orderProduct["clientId"] = parseInt(this.tokenService.getUserId());
      this.orderService
        .postNewOrderItem(this.orderProduct)
        .subscribe((response) => {
          if (response == "OK") {
            this.eventEmitterService.onItemEvent("Cantidad actualizada");
            this._snackBar.open("Agregado a carrito de compras", "OK", {
              duration: 3000,
            });
          }
        });
      this.fetchProduct(this.id);
    }
  }
  backClicked() {
    this._location.back();
  }
}
