import { Pipe, PipeTransform } from "@angular/core";
import { CartService } from "src/app/core/services/cart.service";
import { Product } from "../models/product";

@Pipe({
  name: "cart",
})
export class CartPipe implements PipeTransform {
  // products: Product[];

  constructor(private cartService: CartService) {}

  transform(product: any, args?: any): any {
    var total = 0;
    this.cartService.cart$.subscribe((products) => {
      products.forEach((elemento) => {
        if (elemento.productId === product.productId) {
          total += 1;
        }
      });
    });
    return total;
  }
}
