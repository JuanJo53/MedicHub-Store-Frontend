import { SubsidiaryListRequest } from "./../../../shared/models/subsidiary-list-request";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subsidiary } from "src/app/shared/models/subsidiary";
import { SubsidiaryRequest } from "src/app/shared/models/subsidiary-request";
import apiKey from "../../apiKey";

@Injectable({
  providedIn: "root",
})
export class SubsidiariesService {
  constructor(private http: HttpClient) {}

  postNewSubsidiary(subsidiary: SubsidiaryRequest) {
    return this.http.post(apiKey.api + "/subsidiary", subsidiary);
  }
  getSubsidiaries(pharmId: number) {
    return this.http.get<SubsidiaryListRequest[]>(
      apiKey.api + `/pharmacy/${pharmId}/subsidiary`
    );
  }
  getSpecificSubsidiary(subsiId: number) {
    return this.http.get<Subsidiary>(apiKey.api + "/subsidiary/" + subsiId);
  }
  updateSubsidiary(subsiId: number, subsidiary: SubsidiaryRequest) {
    return this.http.put(apiKey.api + `/subsidiary`, subsidiary);
  }
  deleteSubsidiary(subsiId: number) {
    return this.http.delete(apiKey.api + `/subsidiary/${subsiId}`);
  }
}
