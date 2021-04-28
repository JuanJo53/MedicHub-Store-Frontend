import { PasswordRequest } from "src/app/shared/models/passwordRequest";
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
    return this.http.post(apiKey.api + "/client", client);
  }
  getClients(page: number, size: number, order: string, asc: boolean) {
    return this.http.get<Client[]>(
      apiKey.api +
        `/client?page=${
          (page - 1) * size
        }&size=${size}&order=${order}&asc=${asc}`,
      {
        headers: this.headers,
      }
    );
  }
  getTotalClients() {
    return this.http.get<any>(apiKey.api + `/client/total`, {
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
