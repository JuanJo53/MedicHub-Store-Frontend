import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BankAccount } from "src/app/shared/models/bank-account";
import apiKey from "../../apiKey";
import { TokenService } from "../../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class BankAccountService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}
  postNewBankAccoun(bankAccount: BankAccount) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.post(apiKey.api + "/bankAccount", bankAccount, {
      headers: headers,
    });
  }
  getBankAccoun(pharmacyId: number) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.get<BankAccount>(
      apiKey.api + `/bankAccount/${pharmacyId}`,
      { headers: headers }
    );
  }
  updateBankAccoun(bankAccount: BankAccount) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.put(apiKey.api + `/bankAccount`, bankAccount, {
      headers: headers,
    });
  }
}
