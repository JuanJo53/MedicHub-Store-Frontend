import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Client } from "src/app/shared/models/client";
import apiKey from "../../apiKey";
import { TokenService } from "../../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}
  postNewClient(newClient: Client) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.post(apiKey.api + "/client", newClient, {
      headers: headers,
    });
  }
  getClients() {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.get<Client[]>(apiKey.api + `/clients`, {
      headers: headers,
    });
  }
  getClientDetail(clientId: number) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.get<Client>(apiKey.api + `/clients/${clientId}`, {
      headers: headers,
    });
  }
  updateAdmins(client: Client) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.put(apiKey.api + `/clients`, client, {
      headers: headers,
    });
  }
  deleteAdmins(clientId: number) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.delete(apiKey.api + `/clients/${clientId}`, {
      headers: headers,
    });
  }
}
