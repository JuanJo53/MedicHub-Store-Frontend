import { filter, map } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Product } from "src/app/shared/models/product";
import { CartService } from "src/app/core/services/cart.service";
import { Observable } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CardService } from "src/app/core/http/client/card.service";
import { TokenService } from "src/app/core/authentication/token.service";
import { Card } from "src/app/shared/models/card";

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
  cards: Card[];
  id: number;

  isLinear = false;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  orderTotal: number;

  constructor(
    private cartService: CartService,
    private cardService: CardService,
    private tokenService: TokenService,
    private _formBuilder: FormBuilder
  ) {
    this.products$ = this.cartService.cart$.pipe(
      map((products: []) => {
        const distintos = [...new Set(products)];
        this.orderProducts = products;
        this.orderProducts.forEach((prod) => {
          this.orderTotal = this.orderTotal + prod.price * prod.quantity;
        });
        return distintos;
      })
    );
  }

  ngOnInit() {
    try {
      this.id = parseInt(this.tokenService.getUserId());
      if (this.id) {
        this.fecthCards(this.id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  fecthCards(id: number): void {
    this.cards = [];
    this.cardService.getClientCards(id).subscribe((cards) => {
      console.log("fetching cards");
      this.cards = cards;
      console.log(cards);
    });
  }
}
