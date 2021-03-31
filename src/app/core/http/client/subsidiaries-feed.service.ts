import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SubsidiaryFeedListRequest } from "src/app/shared/models/subsidiary-feed-list-request";
import apiKey from "../../apiKey";
import { TokenService } from "../../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class SubsidiariesFeedService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getAllSibsidiaries() {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.get<SubsidiaryFeedListRequest[]>(
      apiKey.api + `/subsidiary`,
      {
        headers: headers,
      }
    );
  }
}
