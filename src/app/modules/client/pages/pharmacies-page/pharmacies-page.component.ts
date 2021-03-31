import { SubsidiariesFeedService } from "./../../../../core/http/client/subsidiaries-feed.service";
import { Component, OnInit } from "@angular/core";
import { SubsidiaryFeedListRequest } from "src/app/shared/models/subsidiary-feed-list-request";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-pharmacies-page",
  templateUrl: "./pharmacies-page.component.html",
  styleUrls: ["./pharmacies-page.component.scss"],
})
export class PharmaciesPageComponent implements OnInit {
  subsidiaies: SubsidiaryFeedListRequest[] = [];
  dataSource = new MatTableDataSource();

  constructor(private subsifeedService: SubsidiariesFeedService) {}

  ngOnInit() {
    console.log("OnInit excecuted");
    this.fecthPharmacies();
  }
  fecthPharmacies(): void {
    this.subsifeedService.getAllSibsidiaries().subscribe((subsidiaies) => {
      this.subsidiaies = subsidiaies;
      this.dataSource = new MatTableDataSource(this.subsidiaies);
      console.log(subsidiaies);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
