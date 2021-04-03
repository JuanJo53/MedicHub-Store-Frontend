import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SubsidiaryFeedListRequest } from "src/app/shared/models/subsidiary-feed-list-request";
import apiKey from "../../apiKey";
import { TokenService } from "../../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class SubsidiariesFeedService {
  authToken: string;
  headers: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  getAllSibsidiaries() {
    return this.http.get<SubsidiaryFeedListRequest[]>(
      apiKey.api + `/subsidiary`,
      {
        headers: this.headers,
      }
    );
  }
}
