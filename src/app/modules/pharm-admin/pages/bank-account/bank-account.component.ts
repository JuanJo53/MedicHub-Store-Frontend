import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { BankAccountService } from "src/app/core/http/pharm-admin/bank-account.service";
import { BankAccount } from "src/app/shared/models/bank-account";
import { AddBankAccountComponent } from "../../components/dialogs/add-bank-account/add-bank-account.component";

@Component({
  selector: "app-bank-account",
  templateUrl: "./bank-account.component.html",
  styleUrls: ["./bank-account.component.scss"],
})
export class BankAccountComponent implements OnInit {
  bankAccount: BankAccount;

  text: string;
  id: number;
  form: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private bankAccountService: BankAccountService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    try {
      if (this.id) {
        this.getDetails(this.id);
      }
    } catch (error) {
      console.error(error);
    }
  }
  getDetails(id: number) {
    this.bankAccountService.getBankAccoun(id).subscribe((bankAccount) => {
      this.bankAccount = bankAccount;
      console.log("bank details reached");
      console.log(this.bankAccount);
      this.editBankAccount(bankAccount.bankAccountId);
    });
  }
  saveChanges(event: Event, id: number): void {
    event.preventDefault();
    if (this.form.valid) {
      const bAccount = this.form.value;
      bAccount.pharmacyId = id;
      this.updateBankAccount(bAccount);
    } else {
      console.log("Bad form");
    }
  }
  updateBankAccount(bankAccount: BankAccount): void {
    this.bankAccountService
      .updateBankAccoun(bankAccount)
      .subscribe((bankAccount) => {
        console.log("bankAccount: ");
        console.log(bankAccount);
      });
  }
  editBankAccount(id: number): void {
    this.form = this.fromBuilder.group({
      bankAccountId: [id, [Validators.required]],
      pharmacyId: [this.bankAccount.pharmacyId, [Validators.required]],
      accountNumber: [
        this.bankAccount.accountNumber,
        [
          Validators.required,
          Validators.maxLength(18),
          Validators.minLength(12),
        ],
      ],
      bank: [
        this.bankAccount.bank,
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(4),
        ],
      ],
      accountType: [
        this.bankAccount.accountType,
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(4),
        ],
      ],
    });
  }
  addBankAccount() {
    const dialogRef = this.dialog.open(AddBankAccountComponent, {
      width: "500px",
      data: {
        id: this.id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.ngOnInit();
    });
  }
}
