import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import apiKey from "../apiKey";
import { TokenService } from "../authentication/token.service";

@Injectable({
  providedIn: "root",
})
export class FileService {
  authToken: string;
  headers: any;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  uploadUserPhoto(formData) {
    const userId = this.tokenService.getUserId();
    return this.http.post<FormData>(
      apiKey.api + `/api/v1/data/admin/${userId}`,
      formData,
      {
        headers: this.headers,
        reportProgress: true,
        observe: "events",
      }
    );
  }
  uploadProductPhoto(formData) {
    const userId = this.tokenService.getUserId();
    return this.http.post<FormData>(
      apiKey.api + `/api/v1/data/admin/${userId}`,
      formData,
      {
        headers: this.headers,
        reportProgress: true,
        observe: "events",
      }
    );
  }
  uploadPharmacyPhoto(formData, pharmId: number) {
    return this.http.post<FormData>(
      apiKey.api + `/pharmacy/${pharmId}/image`,
      formData,
      {
        headers: this.headers,
        reportProgress: true,
        observe: "events",
      }
    );
  }

  getUserPhoto(userId: number) {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.get(
      apiKey.api + `/api/v1/data/department/${userId}/download`,
      {
        headers: header,
        responseType: "blob",
      }
    );
  }
  getProductPic(productId: number) {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.get(
      apiKey.api + `/api/v1/data/department/${productId}/download`,
      {
        headers: header,
        responseType: "blob",
      }
    );
  }
  getPharmacyPic(pharmId: number) {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.get(apiKey.api + `/pharmacy/${pharmId}/image`, {
      headers: header,
      responseType: "blob",
    });
  }
  download(depto: string): any {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http.get(
      apiKey.api + `/api/v1/data/department/${depto}/download`,
      {
        headers: header,
        responseType: "blob",
      }
    );
  }
  // getAllFiles() {
  //   return this.http.get<FileRequest[]>(apiKey.api, {
  //     headers: this.headers,
  //   });
  // }
}
