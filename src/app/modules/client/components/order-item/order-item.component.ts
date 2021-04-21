import { Component, Input, OnInit } from "@angular/core";
import { CartService } from "src/app/core/services/cart.service";
import { Product } from "src/app/shared/models/product";

@Component({
  selector: "app-order-item",
  templateUrl: "./order-item.component.html",
  styleUrls: ["./order-item.component.scss"],
})
export class OrderItemComponent implements OnInit {
  @Input() product: Product;
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getProductQuantity();
  }
  getProductQuantity() {
    var total = 0;
    this.cartService.cart$.subscribe((products) => {
      products.forEach((elemento) => {
        if (elemento.productId === this.product.productId) {
          total += 1;
        }
      });
    });
    this.product.quantity = total;
  }
  removeProduct(id: number) {
    // this.cartService.removeCart(id);
  }
}
