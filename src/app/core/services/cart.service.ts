import { OrderService } from "src/app/core/http/client/order.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "src/app/shared/models/product";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private products: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);

  cart$ = this.cart.asObservable();

  constructor(private orderService: OrderService) {}

  addCart(product: Product) {
    this.products = [...this.products, product];
    this.cart.next(this.products);
  }
  removeItem(productId: number) {
    this.products = this.products.filter(
      (item) => item.productId !== productId
    );
    this.cart.next(this.products);
    console.log(this.products);
  }
  fetchProducts(clientId: number) {
    this.orderService.getClientOrderItems(clientId).subscribe((products) => {
      this.products = products;
    });
  }
  getProducts() {
    return this.products;
  }
}
