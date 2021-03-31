import { Component, Input, OnInit } from "@angular/core";
import { Pharmacy } from "src/app/shared/models/pharmacy";

@Component({
  selector: "app-pharmacy-item",
  templateUrl: "./pharmacy-item.component.html",
  styleUrls: ["./pharmacy-item.component.scss"],
})
export class PharmacyItemComponent implements OnInit {
  @Input() pharmacy: Pharmacy;
  constructor() {}

  ngOnInit() {}
}
