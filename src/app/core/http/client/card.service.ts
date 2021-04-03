import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Card } from "src/app/shared/models/card";
import apiKey from "../../apiKey";
import { TokenService } from "../../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class CardService {
  authToken: string;
  headers: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }
  postNewCard(card: Card) {
    return this.http.post(apiKey.api + "/card", card, {
      headers: this.headers,
    });
  }
  getClientCards(clientId: number) {
    return this.http.get<Card[]>(apiKey.api + `/client/${clientId}/card`, {
      headers: this.headers,
    });
  }
  updateCard(card: Card) {
    return this.http.put(apiKey.api + `/card`, card, {
      headers: this.headers,
    });
  }
  deleteCard(cardId: number) {
    return this.http.delete(apiKey.api + `/card/${cardId}`, {
      headers: this.headers,
    });
  }
}
