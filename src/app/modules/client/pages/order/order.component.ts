import { Component, OnInit } from "@angular/core";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Product } from "src/app/shared/models/product";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CardService } from "src/app/core/http/client/card.service";
import { TokenService } from "src/app/core/authentication/token.service";
import { Card } from "src/app/shared/models/card";
import { OrderService } from "src/app/core/http/client/order.service";
import { Order } from "src/app/shared/models/order";

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
  reserve: Order;
  products: Product[];
  orderProducts: Product[] = [];
  cards: Card[];
  selectedCard: Card;
  id: number;

  isLinear = false;

  constructor(
    private cardService: CardService,
    private tokenService: TokenService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    try {
      this.id = parseInt(this.tokenService.getUserId());
      if (this.id) {
        this.fetchOrderDetails();
        this.fecthCards(this.id);
      }
    } catch (error) {
      console.error(error);
    }
  }
  fetchOrderDetails() {
    this.orderService.getOrderDetail(this.id).subscribe((data) => {
      this.reserve = data;
      this.products = this.reserve.product;
    });
  }
  fecthCards(id: number): void {
    this.cards = [];
    this.cardService.getClientCards(id).subscribe((cards) => {
      this.cards = cards;
    });
  }
  buyProducts() {}
}
