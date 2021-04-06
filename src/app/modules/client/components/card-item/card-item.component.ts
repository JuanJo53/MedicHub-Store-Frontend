import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { CardService } from "src/app/core/http/client/card.service";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { WarningDialogComponent } from "src/app/modules/components/dialogs/warning-dialog/warning-dialog.component";
import { Card } from "src/app/shared/models/card";

@Component({
  selector: "app-card-item",
  templateUrl: "./card-item.component.html",
  styleUrls: ["./card-item.component.scss"],
})
export class CardItemComponent implements OnInit {
  @Input() card: Card;
  form: FormGroup;

  id: number;
  edit = false;
  destroyed = false;
  text: string;

  constructor(
    private fromBuilder: FormBuilder,
    private cardService: CardService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.id = this.card.cardId;
  }
  ngOnDestroy(): void {
    this.destroyed = true;
  }
  cancel() {
    this.edit = false;
  }
  editCard(): void {
    this.edit = true;
    this.form = this.fromBuilder.group({
      cardId: [this.id, [Validators.required]],
      accountNumber: [
        this.card.accountNumber,
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(4),
        ],
      ],
      bank: [
        this.card.bank,
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(4),
        ],
      ],
      typeAccount: [
        this.card.typeAccount,
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(2),
        ],
      ],
      cvvCode: [
        this.card.cvvCode,
        [Validators.required, Validators.maxLength(4), Validators.minLength(2)],
      ],
      month: [
        this.card.month,
        [Validators.required, Validators.maxLength(2), Validators.minLength(1)],
      ],
      year: [
        this.card.year,
        [Validators.required, Validators.maxLength(4), Validators.minLength(2)],
      ],
    });
  }
  saveCard(event: Event): void {
    event.preventDefault();
    console.log(this.form.valid);
    if (this.form.valid) {
      const card = this.form.value;
      this.updateCard(card);
    } else {
      console.log("Bad form");
    }
    this.cancel();
  }
  updateCard(updateCard: Card): void {
    this.cardService.updateCard(updateCard).subscribe((response) => {
      console.log("Response PUT: " + response);
      if ((response = "OK")) {
        this.displaySuccesDialog("¡Se actualizó la tarjeta exitosamente!");
      }
    });
  }
  deleteCard(id: number): void {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: "500px",
      data: {
        message: "¿Esta seguro que desea eliminar la farmacia?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(id);
      if (result) {
        this.cardService.deleteCard(id).subscribe((rta) => {
          console.log("Response " + rta);
          this.text = result;
          this.displaySuccesDialog("¡Se elimino la tarjeta exitosamente!");
        });
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
