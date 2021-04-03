import { TokenService } from "src/app/core/authentication/token.service";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CardService } from "src/app/core/http/client/card.service";
import { Card } from "src/app/shared/models/card";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { CreateCardComponent } from "../../components/dialogs/create-card/create-card.component";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";

@Component({
  selector: "app-client-cards",
  templateUrl: "./client-cards.component.html",
  styleUrls: ["./client-cards.component.scss"],
})
export class ClientCardsComponent implements OnInit {
  cards: Card[];
  dataSource = new MatTableDataSource();
  form: FormGroup;
  id: number;

  constructor(
    private cardService: CardService,
    private tokenService: TokenService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    try {
      this.id = parseInt(this.tokenService.getUserId());
      if (this.id) {
        this.fecthCards(this.id);
      }
    } catch (error) {
      console.error(error);
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fecthCards(id: number): void {
    this.cardService.getClientCards(id).subscribe((cards) => {
      this.cards = cards;
      this.dataSource = new MatTableDataSource(this.cards);
      console.log(cards);
    });
  }

  addCard() {
    const dialogRef = this.dialog.open(CreateCardComponent, {
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.displaySuccesDialog(
          "¡Se agrego la tarjeta de credito exitosamente!"
        );
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
