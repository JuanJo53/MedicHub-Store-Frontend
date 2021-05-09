import { Component, OnInit } from "@angular/core";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Product } from "src/app/shared/models/product";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CardService } from "src/app/core/http/client/card.service";
import { TokenService } from "src/app/core/authentication/token.service";
import { Card } from "src/app/shared/models/card";
import { OrderService } from "src/app/core/http/client/order.service";
import { Order } from "src/app/shared/models/order";
import { Payment } from "src/app/shared/models/payment";
import { MatDialog } from "@angular/material/dialog";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { ErrorDialogComponent } from "src/app/modules/components/dialogs/error-dialog/error-dialog.component";
import { Router } from "@angular/router";
import { EventEmitterService } from "src/app/core/services/event-emitter.service";

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
  cards: Card[];
  selectedCard: Card;
  payment: Payment;

  id: number;

  isLinear = false;

  constructor(
    private cardService: CardService,
    private tokenService: TokenService,
    private orderService: OrderService,
    private router: Router,
    private eventEmitterService: EventEmitterService,
    public dialog: MatDialog
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
    this.orderService.getOrderDetail(this.id, 1, 500).subscribe((data) => {
      this.reserve = data;
      this.reserve.total = data.total;
      this.products = this.reserve.product;
    });
  }
  fecthCards(id: number): void {
    this.cards = [];
    this.cardService.getClientCards(id).subscribe((cards) => {
      this.cards = cards;
    });
  }
  removeItem(id: number) {
    console.log(id);
    this.fetchOrderDetails();
  }
  buyProducts() {
    if (this.products.length > 0 && this.selectedCard) {
      this.payment = {
        clientId: this.id,
        cardId: this.selectedCard.cardId,
        total: this.reserve.total,
      };
      console.log(this.payment);
      this.orderService.payCart(this.payment).subscribe((response) => {
        if (response == "OK") {
          this.displaySuccesDialog("¡Gracias por su compra!");
          this.eventEmitterService.onItemEvent("Cantidad actualizada");
          this.router.navigate(["/client/ordersHistory"]);
        } else {
          this.displayFailureDialog("¡Ocurrio un error al procesar su pago!");
        }
      });
    } else {
      console.log("error");
    }
  }
  displaySuccesDialog(text: string) {
    this.dialog.open(SuccesDialogComponent, {
      width: "500px",
      data: {
        message: text,
      },
    });
  }
  displayFailureDialog(text: string) {
    this.dialog.open(ErrorDialogComponent, {
      width: "500px",
      data: {
        message: text,
      },
    });
  }
  
  buyCancelledProducts(){
    if (this.products.length < 0 ) {
      this.displayCancelledBuyProducts("¡Gracias por su compra!");
    } else {
      console.log("error");
    }
  }
  displayCancelledBuyProducts(text: string){
    this.dialog.open(SuccesDialogComponent, {
      width: "500px",
      data: {
        message: text,
      },
    });
  }
}
