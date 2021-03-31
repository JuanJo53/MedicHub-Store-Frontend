import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { CardService } from "src/app/core/http/client/card.service";
import { Card } from "src/app/shared/models/card";

@Component({
  selector: 'app-client-cards',
  templateUrl: './client-cards.component.html',
  styleUrls: ['./client-cards.component.scss']
})
export class ClientCardsComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fromBuilder: FormBuilder,
    private cardService: CardService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }

  ){ }

  ngOnInit() {
    this.editCard();
  }
  saveChanges(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const card = this.form.value;
      this.updateCard(card);
    } else {
      console.log("Bad form");
    }
  }
  updateCard(card: Card): void {
    this.cardService
      .postNewCard(card)
      .subscribe((card) => {
        console.log("card: ");
        console.log(card);
       // this.dialogRef.close(false);
      });
  }
  editCard(): void {
    this.form = this.fromBuilder.group({
      clientId: [this.data.id, [Validators.required]],
      accountNumber: [
        "",
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(4),
        ],
      ],
      bank: [
        "",
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(4),
        ],
      ],
      typeAccount: [
        "",
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(4),
        ],
      ],
      cvvCode: [
        "",
        [
          Validators.required,
          Validators.maxLength(4),
          Validators.minLength(2),
        ],
      ],
      month: [
        "",
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(1),
        ],
      ],
      year: [
        "",
        [
          Validators.required,
          Validators.maxLength(4),
          Validators.minLength(3),
        ],
      ],
    });
  }

}
