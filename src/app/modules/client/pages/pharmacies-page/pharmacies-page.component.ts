import { Component, OnInit } from "@angular/core";
import { PharmaciesService } from "src/app/core/http/admin/pharmacies.service";
import { Pharmacy } from "src/app/shared/models/pharmacy";

@Component({
  selector: "app-pharmacies-page",
  templateUrl: "./pharmacies-page.component.html",
  styleUrls: ["./pharmacies-page.component.scss"],
})
export class PharmaciesPageComponent implements OnInit {
  pharmacies: Pharmacy[] = [];
  constructor(private pharmaciesService: PharmaciesService) {}

  ngOnInit() {
    console.log("OnInit excecuted");
    this.fecthPharmacies();
  }
  fecthPharmacies(): void {
    this.pharmaciesService.getAllPharmacies().subscribe((pharmacies) => {
      this.pharmacies = pharmacies;
      console.log(pharmacies);
    });
  }
}
