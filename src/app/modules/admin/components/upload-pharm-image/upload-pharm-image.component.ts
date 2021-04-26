import { HttpEventType } from "@angular/common/http";
import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FileService } from "src/app/core/services/file.service";

@Component({
  selector: "app-upload-pharm-image",
  templateUrl: "./upload-pharm-image.component.html",
  styleUrls: ["./upload-pharm-image.component.scss"],
})
export class UploadPharmImageComponent implements OnInit {
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;

  files = [];
  fileName: string;

  uploading = false;

  constructor(private fileUploadService: FileService) {}

  ngOnInit(): void {}

  onClick() {
    this.files = [];
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        // this.fileName = file.name + ' is uploaded';
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }
  private uploadFiles() {
    this.uploading = true;
    this.fileUpload.nativeElement.value = "";
    this.files.forEach((file) => {
      this.uploadFile(file);
      this.files = [];
    });
  }
  uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file.data);
    file.inProgress = true;
    this.fileUploadService.uploadPharmacyPhoto(formData).subscribe((rsp) => {
      console.log(rsp);
      if (rsp.type === HttpEventType.Response) {
        console.log("Ended ");
      }
      if (rsp.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round((100 * rsp.loaded) / rsp.total);
        console.log("Progress " + percentDone + "%");
      }

      this.uploading = false;
    }),
      (error) => {
        console.log("Error ");
      };
    this.files = [];
  }
}
