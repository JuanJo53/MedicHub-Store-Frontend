import { HttpEventType } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FileService } from "src/app/core/services/file.service";
import { ErrorDialogComponent } from "src/app/modules/components/dialogs/error-dialog/error-dialog.component";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";

@Component({
  selector: "app-upload-client-image",
  templateUrl: "./upload-client-image.component.html",
  styleUrls: ["./upload-client-image.component.scss"],
})
export class UploadClientImageComponent implements OnInit {
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;

  files = [];
  fileName: string;

  uploading = false;

  constructor(
    private fileUploadService: FileService,
    public dialog: MatDialog
  ) {}

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
    formData.append("image", file.data);
    file.inProgress = true;
    this.fileUploadService.uploadUserPhoto(formData).subscribe((rsp) => {
      console.log(rsp);
      if (rsp.type === HttpEventType.Response) {
        this.displaySuccesDialog("¡El archivo se subio exitosamente!");
      }
      if (rsp.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round((100 * rsp.loaded) / rsp.total);
        console.log("Progress " + percentDone + "%");
      }
      this.uploading = false;
    }),
      (error) => {
        this.displayFailureDialog("¡Error critico!\n" + error);
      };
    this.files = [];
  }
  displaySuccesDialog(text: string) {
    this.dialog.open(SuccesDialogComponent, {
      width: "500px",
      data: {
        message: text,
      },
    });
  }
  displayFailureDialog(text: string) {
    this.dialog.open(ErrorDialogComponent, {
      width: "500px",
      data: {
        message: text,
      },
    });
  }
}
