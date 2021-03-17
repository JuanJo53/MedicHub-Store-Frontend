import { Pharmacy } from "./../../../../shared/models/pharmacy";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PharmaciesService } from "src/app/core/http/admin/pharmacies.service";
import { CreatePharmacyComponent } from "src/app/modules/components/dialogs/create-pharmacy/create-pharmacy.component";

@Component({
  selector: "app-pharmacies",
  templateUrl: "./pharmacies.component.html",
  styleUrls: ["./pharmacies.component.scss"],
})
export class PharmaciesComponent implements OnInit {
  pharmacies: Pharmacy[] = [
    {
      pharmacyId: 0,
      name: "Available",
      phone: "1232552",
      email: "pharmabol@gmail.com",
      picture: "sadfafsdfsfsf",
      status: 1,
    },
    {
      pharmacyId: 1,
      name: "Ready",
      phone: "1232552",
      email: "pharmabol@gmail.com",
      picture: "sadfafsdfsfsf",
      status: 1,
    },
    {
      pharmacyId: 2,
      name: "Started",
      phone: "1232552",
      email: "pharmabol@gmail.com",
      picture: "sadfafsdfsfsf",
      status: 1,
    },
  ];

  name: string;
  phone: string;
  email: string;

  constructor(
    public dialog: MatDialog,
    private pharmaciesService: PharmaciesService
  ) {}

  ngOnInit() {
    console.log("OnInit excecuted");
    this.fecthPharmacies();
  }
  addPharmacy(): void {
    const dialogRef = this.dialog.open(CreatePharmacyComponent, {
      width: "500px",
      data: {
        name: this.name,
        phone: this.phone,
        email: this.email,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.name = result;
      this.ngOnInit();
    });
  }
  fecthPharmacies(): void {
    this.pharmaciesService.getAllPharmacies().subscribe((pharmacies) => {
      this.pharmacies = pharmacies;
    });
  }
}
