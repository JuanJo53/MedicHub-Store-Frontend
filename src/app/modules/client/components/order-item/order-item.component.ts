import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { OrderService } from "src/app/core/http/client/order.service";
import { CartService } from "src/app/core/services/cart.service";
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
  item: ProductOrder;

  image: any;
  editQuantity = false;
  productTotalPrice: number;

  constructor(
    private fileService: FileService,
    private orderService: OrderService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.fetchProductPhoto();
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
    this.orderService
      .updateOrderItemQuantity(this.item)
      .subscribe((response) => {
        console.log(response);
      });
  }
  fetchProductPhoto() {
    this.fileService.getUserPhoto(this.product.picture).subscribe((data) => {
      let objectURL = URL.createObjectURL(data);
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
  removeProduct(id: number) {
    this.orderService.removeOrderItem(id).subscribe((response) => {
      if (response == "ACCEPTED") {
        console.log(response);
      } else {
        console.log("nel");
      }
    });
  }
}
