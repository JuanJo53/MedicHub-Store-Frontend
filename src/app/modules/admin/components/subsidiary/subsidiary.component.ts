import { SubsidiaryListRequest } from "./../../../../shared/models/subsidiary-list-request";
import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { SubsidiariesService } from "src/app/core/http/admin/subsidiaries.service";
import { MatDialog } from "@angular/material/dialog";
import { WarningDialogComponent } from "../../../components/dialogs/warning-dialog/warning-dialog.component";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";

@Component({
  selector: "app-subsidiary",
  templateUrl: "./subsidiary.component.html",
  styleUrls: ["./subsidiary.component.scss"],
})
export class SubsidiaryComponent implements OnInit {
  @Input() subsidiary: SubsidiaryListRequest;

  form: FormGroup;

  name: string;
  pharmId: number;
  destroyed = false;

  constructor(
    private subsidiariesService: SubsidiariesService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}
  ngOnDestroy(): void {
    this.destroyed = true;
  }
  fetchSubsidiaries(id: number): void {
    this.subsidiariesService.getSubsidiaries(id).subscribe((subsidiary) => {
      console.log(subsidiary);
    });
  }
  deleteSubsidiary(id: number): void {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: "500px",
      data: {
        message: "¿Esta seguro que desea eliminar la sucursal?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subsidiariesService.deleteSubsidiary(id).subscribe((rta) => {
          console.log("Resultado " + rta);
        });
        this.displaySuccesDialog("¡Se elimino la sucursal exitosamente!");
        this.ngOnDestroy();
      }
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
