import { MatTableDataSource } from "@angular/material/table";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ClientService } from "src/app/core/http/admin/client.service";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { Client } from "src/app/shared/models/client";
import { EditClientComponent } from "../../components/dialogs/edit-client/edit-client.component";
import { WarningDialogComponent } from "src/app/modules/components/dialogs/warning-dialog/warning-dialog.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-clients-page",
  templateUrl: "./clients-page.component.html",
  styleUrls: ["./clients-page.component.scss"],
})
export class ClientsPageComponent implements OnInit {
  clients: Client[] = [];

  isLoadingResults = true;
  isRateLimitReached = false;

  length = 12;
  size = 30;
  order = "id";
  asc = true;
  actualPage = 0;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  text: string;
  displayedColumns: string[] = [
    "id_usuario",
    "Name",
    "FirstSurname",
    "SecondSurname",
    "Ci",
    "Email",
    "Username",
    "id_userEdit",
    "id_userDel",
  ];

  constructor(public dialog: MatDialog, private clientService: ClientService) {}
  ngOnInit() {
    try {
      this.clientService.getTotalClients().subscribe((element) => {
        this.length = element;
      });
      this.fecthClients(1);
    } catch (error) {
      console.error(error);
    }
  }
  dataSource = new MatTableDataSource();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  refreshClients(event) {
    this.actualPage = event.pageIndex;
    this.fecthClients(event.pageIndex + 1);
  }
  fecthClients(page: number): void {
    this.clients = [];
    this.isLoadingResults = true;
    this.clientService
      .getClients(page, this.size, this.order, this.asc)
      .subscribe((clients) => {
        this.clients = clients;
        this.dataSource = new MatTableDataSource(this.clients);
        this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
        console.log(clients);
        this.isLoadingResults = false;
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
          "¡Los datos del cliente se actualizaron exitosamente!"
        );
        this.fecthClients(this.actualPage + 1);
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
        this.clientService.deleteClient(id).subscribe((rta) => {
          console.log("Resultado " + rta);
          this.text = result;
          this.displaySuccesDialog("¡Se elimino al cliente exitosamente!");
          this.ngOnInit();
        });
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
