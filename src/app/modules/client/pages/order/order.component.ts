import { filter, map } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Product } from "src/app/shared/models/product";
import { CartService } from "src/app/core/services/cart.service";
import { Observable } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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

  isLinear = false;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    private cartService: CartService,
    private _formBuilder: FormBuilder
  ) {
    this.products$ = this.cartService.cart$.pipe(
      map((products: []) => {
        const distintos = [...new Set(products)];
        return distintos;
      })
    );
  }

  ngOnInit() {}
}
