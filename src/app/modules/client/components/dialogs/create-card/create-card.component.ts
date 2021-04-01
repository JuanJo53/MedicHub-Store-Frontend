import { TokenService } from "./../../../../../core/authentication/token.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { CardService } from "src/app/core/http/client/card.service";
import { Card } from "src/app/shared/models/card";

@Component({
  selector: "app-create-card",
  templateUrl: "./create-card.component.html",
  styleUrls: ["./create-card.component.scss"],
})
export class CreateCardComponent implements OnInit {
  form: FormGroup;
  id: number;

  constructor(
    private fromBuilder: FormBuilder,
    private cardService: CardService,
    private tokenService: TokenService,
    public dialogRef: MatDialogRef<CreateCardComponent>
  ) {}

  ngOnInit() {
    try {
      this.id = parseInt(this.tokenService.getUserName());
      this.editCard();
    } catch (error) {
      console.error(error);
    }
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  saveCard(): void {
    if (this.form.valid) {
      const pharmacy = this.form.value;
      console.log(pharmacy);
      this.createPharmacy(pharmacy);
      this.dialogRef.close(true);
    } else {
      console.log("bad form");
    }
  }
  createPharmacy(newCard: Card): void {
    this.cardService.postNewCard(newCard).subscribe((card) => {
      console.log(card);
    });
  }
  editCard(): void {
    this.form = this.fromBuilder.group({
      clientId: [this.id, [Validators.required]],
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
        [Validators.required, Validators.maxLength(4), Validators.minLength(2)],
      ],
      month: [
        "",
        [Validators.required, Validators.max(12), Validators.minLength(1)],
      ],
      year: [
        "",
        [Validators.required, Validators.maxLength(4), Validators.minLength(3)],
      ],
    });
  }
}
