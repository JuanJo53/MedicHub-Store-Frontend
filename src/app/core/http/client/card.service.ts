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
  getClientCards(clientId: number) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.get<Card[]>(apiKey.api + `/client/${clientId}/card`, {
      headers: headers,
    });
  }
  updateCard(card: Card) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.put(apiKey.api + `/card`, card, {
      headers: headers,
    });
  }
  deleteCard(cardId: Card) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.delete(apiKey.api + `/card/${cardId}`, {
      headers: headers,
    });
  }
}
