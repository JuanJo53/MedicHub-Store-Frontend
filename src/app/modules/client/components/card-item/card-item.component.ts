import { Component, Input, OnInit } from "@angular/core";
import { Card } from "src/app/shared/models/card";

@Component({
  selector: "app-card-item",
  templateUrl: "./card-item.component.html",
  styleUrls: ["./card-item.component.scss"],
})
export class CardItemComponent implements OnInit {
  @Input() card: Card;

  edit = false;
  destroyed = false;
  constructor() {}

  ngOnInit() {}
}
