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
  name: string;
  phone: string;
  email: string;

  constructor(
    public dialog: MatDialog,
    private pharmaciesService: PharmaciesService
  ) {}

  ngOnInit() {
    console.log("OnInit excecuted");
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
}
