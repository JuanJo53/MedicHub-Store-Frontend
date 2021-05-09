import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { TokenService } from "src/app/core/authentication/token.service";
import { OrderService } from "src/app/core/http/client/order.service";
import { FileService } from "src/app/core/services/file.service";
import { Product } from "src/app/shared/models/product";
import { ProductOrder } from "src/app/shared/models/product-order";

@Component({
  selector: "app-order-item",
  templateUrl: "./order-item.component.html",
  styleUrls: ["./order-item.component.scss"],
})
export class OrderItemComponent implements OnInit {
  @Input() product: Product;
  @Output() removeOrderItemEvent = new EventEmitter<number>();

  item: ProductOrder;

  clientId: number;
  image: any;
  editQuantity = false;
  productTotalPrice: number;

  constructor(
    private fileService: FileService,
    private orderService: OrderService,
    private tokenService: TokenService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.clientId = parseInt(this.tokenService.getUserId());
    this.fetchProductPhoto();
    this.getRefreshQuantity();
  }
  getRefreshQuantity() {
    this.productTotalPrice = this.product.price * this.product.quantity;
  }
  changeQuantity() {
    if (this.editQuantity) {
      this.editQuantity = false;
    } else {
      this.editQuantity = true;
    }
  }
  updateQuantity() {
    this.item = this.product;
    this.item["clientId"] = this.clientId;
    this.item["productId"] = this.product.productId;
    this.item["quantity"] = this.product.quantity;
    console.log(this.item);
    this.orderService
      .updateOrderItemQuantity(this.item)
      .subscribe((response) => {
        console.log(response);
        this.removeOrderItemEvent.emit(0);
      });
    this.editQuantity = false;
  }
  fetchProductPhoto() {
    if (this.product.picture != "null") {
      this.fileService.getUserPhoto(this.product.picture).subscribe((data) => {
        let objectURL = URL.createObjectURL(data);
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
    }
  }
  removeProduct(id: number) {
    this.orderService.removeOrderItem(id).subscribe((response) => {
      if (response == "ACCEPTED") {
        this.removeOrderItemEvent.emit(id);
      } else {
        console.log("nel");
      }
    });
  }
}
