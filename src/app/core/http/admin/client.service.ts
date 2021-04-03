import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Client } from "src/app/shared/models/client";
import apiKey from "../../apiKey";
import { TokenService } from "../../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  authToken: string;
  headers: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }
  postNewClient(client: Client) {
    return this.http.post(apiKey.api + "/client", client, {
      headers: this.headers,
    });
  }
  getClients() {
    return this.http.get<Client[]>(apiKey.api + `/client`, {
      headers: this.headers,
    });
  }
  getClientDetail(clientId: number) {
    return this.http.get<Client>(apiKey.api + `/client/${clientId}`, {
      headers: this.headers,
    });
  }
  updateClient(client: Client) {
    return this.http.put(apiKey.api + `/client`, client, {
      headers: this.headers,
    });
  }
  deleteClient(clientId: number) {
    return this.http.delete(apiKey.api + `/client/${clientId}`, {
      headers: this.headers,
    });
  }
}
