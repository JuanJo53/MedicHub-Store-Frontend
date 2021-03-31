import { Component, Input, OnInit } from "@angular/core";
import { Subsidiary } from "src/app/shared/models/subsidiary";
import { SubsidiaryFeedListRequest } from "src/app/shared/models/subsidiary-feed-list-request";

@Component({
  selector: "app-pharmacy-item",
  templateUrl: "./pharmacy-item.component.html",
  styleUrls: ["./pharmacy-item.component.scss"],
})
export class PharmacyItemComponent implements OnInit {
  @Input() subsidiary: SubsidiaryFeedListRequest;
  constructor() {}

  ngOnInit() {}
}
