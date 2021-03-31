import { Pharmacy } from "./../../../../shared/models/pharmacy";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PharmaciesService } from "src/app/core/http/admin/pharmacies.service";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { CreatePharmacyComponent } from "../../components/dialogs/create-pharmacy/create-pharmacy.component";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-pharmacies",
  templateUrl: "./pharmacies.component.html",
  styleUrls: ["./pharmacies.component.scss"],
})
export class PharmaciesComponent implements OnInit {
  pharmacies: Pharmacy[] = [];
  dataSource = new MatTableDataSource();

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
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.displaySuccesDialog("¡Se agrego la pharmacia exitosamente!");
        this.ngOnInit();
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  fecthPharmacies(): void {
    this.pharmaciesService.getAllPharmacies().subscribe((pharmacies) => {
      this.pharmacies = pharmacies;
      this.dataSource = new MatTableDataSource(this.pharmacies);
      console.log(pharmacies);
    });
  }
  displaySuccesDialog(text: string) {
    this.dialog.open(SuccesDialogComponent, {
      width: "500px",
      data: {
        message: text,
      },
    });
  }
}
