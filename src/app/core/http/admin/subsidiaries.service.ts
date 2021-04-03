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
  authToken: string;
  headers: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  postNewSubsidiary(subsidiary: SubsidiaryRequest) {
    return this.http.post(apiKey.api + "/subsidiary", subsidiary, {
      headers: this.headers,
    });
  }
  getSubsidiaries(pharmId: number) {
    return this.http.get<SubsidiaryListRequest[]>(
      apiKey.api + `/pharmacy/${pharmId}/subsidiary`,
      { headers: this.headers }
    );
  }
  getSpecificSubsidiary(subsiId: number) {
    return this.http.get<SubsidiaryRequest>(
      apiKey.api + "/subsidiary/" + subsiId,
      { headers: this.headers }
    );
  }
  updateSubsidiary(subsiId: number, subsidiary: SubsidiaryRequest) {
    return this.http.put(apiKey.api + `/subsidiary`, subsidiary, {
      headers: this.headers,
    });
  }
  deleteSubsidiary(subsiId: number) {
    return this.http.delete(apiKey.api + `/subsidiary/${subsiId}`, {
      headers: this.headers,
    });
  }
}
