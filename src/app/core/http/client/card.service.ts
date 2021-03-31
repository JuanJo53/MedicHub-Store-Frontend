import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Card } from "src/app/shared/models/card";
import apiKey from "../../apiKey";
import { TokenService } from "../../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class CardService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}
  postNewCard(card: Card) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.post(apiKey.api + "/card", card, {
      headers: headers,
    });
  }
  /*getBankAccoun(pharmacyId: number) {
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
  }*/
}
