import { SubsidiaryListRequest } from "./../../../shared/models/subsidiary-list-request";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subsidiary } from "src/app/shared/models/subsidiary";
import { SubsidiaryRequest } from "src/app/shared/models/subsidiary-request";
import apiKey from "../../apiKey";
import { TokenService } from "../../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class SubsidiariesService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  postNewSubsidiary(subsidiary: SubsidiaryRequest) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.post(apiKey.api + "/subsidiary", subsidiary, {
      headers: headers,
    });
  }
  getSubsidiaries(pharmId: number) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.get<SubsidiaryListRequest[]>(
      apiKey.api + `/pharmacy/${pharmId}/subsidiary`,
      { headers: headers }
    );
  }
  getSpecificSubsidiary(subsiId: number) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.get<SubsidiaryRequest>(
      apiKey.api + "/subsidiary/" + subsiId,
      { headers: headers }
    );
  }
  updateSubsidiary(subsiId: number, subsidiary: SubsidiaryRequest) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.put(apiKey.api + `/subsidiary`, subsidiary, {
      headers: headers,
    });
  }
  deleteSubsidiary(subsiId: number) {
    var authToken = this.tokenService.getToken();
    var headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    return this.http.delete(apiKey.api + `/subsidiary/${subsiId}`, {
      headers: headers,
    });
  }
}
