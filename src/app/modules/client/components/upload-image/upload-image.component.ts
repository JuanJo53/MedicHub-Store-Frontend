import { Component, OnInit } from '@angular/core';
import { Picture } from 'src/app/shared/models/picture';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
/*export class UploadImageComponent implements OnInit {
  public picture: Picture;
  public archivosServer: Picture;
  public lastPK: number;
  constructor(private _service: ApiService) { }

  subirArchivo(archivo: Archivo) {
    this._service.uploadFile(this.archivo).subscribe(Response => {});
  }

  fileEvent(fileInput: Event) {
    let file = (<HTMLInputElement>fileInput.target).files[0];

    if (file.type == "image/jpeg" || file.type == "image/png") {
      this.picture = new Picture(this.lastPK + 1, file.name, file.type);
    }
  }


  ngOnInit(): void {
    this._service.getUploads().subscribe(Response => {
      this.archivosServer = Response;
      this.lastPK = this.archivosServer[Response.length - 1].id;
    });
  }

}*/

export class UploadImageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
