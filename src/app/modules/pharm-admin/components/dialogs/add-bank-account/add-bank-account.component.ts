import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { BankAccountService } from "src/app/core/http/pharm-admin/bank-account.service";
import { BankAccount } from "src/app/shared/models/bank-account";

@Component({
  selector: "app-add-bank-account",
  templateUrl: "./add-bank-account.component.html",
  styleUrls: ["./add-bank-account.component.scss"],
})
export class AddBankAccountComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fromBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private bankAccountService: BankAccountService,
    public dialogRef: MatDialogRef<AddBankAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit() {
    this.editBankAccount();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  saveChanges(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const bAccount = this.form.value;
      this.updateBankAccount(bAccount);
    } else {
      console.log("Bad form");
    }
  }
  updateBankAccount(bankAccount: BankAccount): void {
    this.bankAccountService
      .postNewBankAccoun(bankAccount)
      .subscribe((bankAccount) => {
        console.log("bankAccount: ");
        console.log(bankAccount);
        this.onNoClick();
      });
  }
  editBankAccount(): void {
    this.form = this.fromBuilder.group({
      pharmacyId: [this.data.id, [Validators.required]],
      accountNumber: [
        "",
        [
          Validators.required,
          Validators.maxLength(18),
          Validators.minLength(12),
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
      accountType: [
        "",
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(4),
        ],
      ],
    });
  }
}
