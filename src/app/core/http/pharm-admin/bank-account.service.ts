import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BankAccount } from "src/app/shared/models/bank-account";
import apiKey from "../../apiKey";
import { TokenService } from "../../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class BankAccountService {
  authToken: string;
  headers: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }
  postNewBankAccoun(bankAccount: BankAccount) {
    return this.http.post(apiKey.api + "/bankAccount", bankAccount, {
      headers: this.headers,
    });
  }
  getBankAccoun(pharmacyId: number) {
    return this.http.get<BankAccount>(
      apiKey.api + `/bankAccount/${pharmacyId}`,
      { headers: this.headers }
    );
  }
  updateBankAccoun(bankAccount: BankAccount) {
    return this.http.put(apiKey.api + `/bankAccount`, bankAccount, {
      headers: this.headers,
    });
  }
}
