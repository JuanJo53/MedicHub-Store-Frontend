import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BankAccount } from "src/app/shared/models/bank-account";
import apiKey from "../../apiKey";

@Injectable({
  providedIn: "root",
})
export class BankAccountService {
  constructor(private http: HttpClient) {}
  postNewBankAccoun(bankAccount: BankAccount) {
    return this.http.post(apiKey.api + "/bankAccount", bankAccount);
  }
  getBankAccoun(pharmacyId: number) {
    return this.http.get<BankAccount>(
      apiKey.api + `/bankAccount/${pharmacyId}`
    );
  }
  updateBankAccoun(bankAccount: BankAccount) {
    return this.http.put(apiKey.api + `/bankAccount`, bankAccount);
  }
}
