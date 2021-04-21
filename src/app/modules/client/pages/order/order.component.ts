import { filter, map } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Product } from "src/app/shared/models/product";
import { CartService } from "src/app/core/services/cart.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class OrderComponent implements OnInit {
  products$: Observable<Product[]>;
  orderProducts: Product[] = [];

  constructor(private cartService: CartService) {
    this.products$ = this.cartService.cart$.pipe(
      map((products: []) => {
        const distintos = [...new Set(products)];
        return distintos;
      })
    );
  }

  ngOnInit() {
    this.getCartProducts();
  }
  getCartProducts() {
    // this.products$ = this.cartService.getProducts();
    // this.orderProducts = this.cartService.getProducts();
    // for (let i = 0; i < this.products.length; i++) {
    //   var c = 0;
    //   for (let j = 0; j < this.orderProducts.length; j++) {
    //     if (this.products[i].productId == this.orderProducts[j].productId) {
    //       c++;
    //       delete this.products[j];
    //       i++;
    //     }
    //   }
    //   if (c > 0) {
    //     this.orderProducts.push(this.products[i]);
    //   }
    // }
    var unique = this.orderProducts.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });
    // console.log(unique);
  }
  filterItem(key: number) {
    this.orderProducts.find(function (elem, index, self) {
      return index === self.indexOf(elem);
    });
    return key;
  }
}
