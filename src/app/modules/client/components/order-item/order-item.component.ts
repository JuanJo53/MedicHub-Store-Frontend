import { Component, Input, OnInit } from "@angular/core";
import { Product } from "src/app/shared/models/product";

@Component({
  selector: "app-order-item",
  templateUrl: "./order-item.component.html",
  styleUrls: ["./order-item.component.scss"],
})
export class OrderItemComponent implements OnInit {
  @Input() product: Product;
  constructor() {}

  ngOnInit() {}
}
