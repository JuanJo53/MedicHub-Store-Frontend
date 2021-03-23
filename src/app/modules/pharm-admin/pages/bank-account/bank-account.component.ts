import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { BankAccountService } from "src/app/core/http/pharm-admin/bank-account.service";
import { BankAccount } from "src/app/shared/models/bank-account";

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
      bankAccountId: [0, [Validators.required]],
      pharmacyId: ["", [Validators.required]],
      accountNumber: ["", [Validators.required]],
      bank: ["", [Validators.required, Validators.email]],
      accountType: ["", [Validators.required]],
    });
    this.form.get("bankAccountId").setValue(id);
    this.form.get("pharmacyId").setValue(this.bankAccount.pharmacyId);
    this.form.get("accountNumber").setValue(this.bankAccount.accountNumber);
    this.form.get("bank").setValue(this.bankAccount.bank);
    this.form.get("accountType").setValue(this.bankAccount.accountType);
  }
}
