import { SubsidiariesFeedService } from "./../../../../core/http/client/subsidiaries-feed.service";
import { Component, OnInit } from "@angular/core";
import { SubsidiaryFeedListRequest } from "src/app/shared/models/subsidiary-feed-list-request";

@Component({
  selector: "app-pharmacies-page",
  templateUrl: "./pharmacies-page.component.html",
  styleUrls: ["./pharmacies-page.component.scss"],
})
export class PharmaciesPageComponent implements OnInit {
  subsidiaies: SubsidiaryFeedListRequest[] = [];
  constructor(private subsifeedService: SubsidiariesFeedService) {}

  ngOnInit() {
    console.log("OnInit excecuted");
    this.fecthPharmacies();
  }
  fecthPharmacies(): void {
    this.subsifeedService.getAllSibsidiaries().subscribe((subsidiaies) => {
      this.subsidiaies = subsidiaies;
      console.log(subsidiaies);
    });
  }
}
