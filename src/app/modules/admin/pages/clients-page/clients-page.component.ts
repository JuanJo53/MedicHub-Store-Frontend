import { MatTableDataSource } from "@angular/material/table";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { TokenService } from "src/app/core/authentication/token.service";
import { ClientService } from "src/app/core/http/admin/client.service";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { Client } from "src/app/shared/models/client";
import { EditClientComponent } from "../../components/dialogs/edit-client/edit-client.component";
import { WarningDialogComponent } from "src/app/modules/components/dialogs/warning-dialog/warning-dialog.component";

@Component({
  selector: "app-clients-page",
  templateUrl: "./clients-page.component.html",
  styleUrls: ["./clients-page.component.scss"],
})
export class ClientsPageComponent implements OnInit {
  clients: Client[] = [];

  text: string;
  displayedColumns: string[] = [
    "id_usuario",
    "Name",
    "FirstSurname",
    "SecondSurname",
    "Ci",
    "id_userEdit",
    "id_userDel",
  ];

  constructor(public dialog: MatDialog, private clientService: ClientService) {}
  ngOnInit() {
    try {
      this.fecthClients();
    } catch (error) {
      console.error(error);
    }
  }
  dataSource = new MatTableDataSource();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  fecthClients(): void {
    this.clients = [];
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
      console.log(clients);
    });
  }
  editClient(clientId: number) {
    const dialogRef = this.dialog.open(EditClientComponent, {
      width: "500px",
      data: {
        clientId: clientId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.displaySuccesDialog(
          "¡Se actualizo los datos del administrador exitosamente!"
        );
        this.ngOnInit();
      }
    });
  }
  deleteClient(id: number): void {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: "500px",
      data: {
        message:
          "¿Esta seguro que desea eliminar la cuente de este administrador?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clientService.deleteAdmins(id).subscribe((rta) => {
          console.log("Resultado " + rta);
          this.text = result;
          this.displaySuccesDialog(
            "¡Se elimino al administrador exitosamente!"
          );
        });
        this.ngOnInit();
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
