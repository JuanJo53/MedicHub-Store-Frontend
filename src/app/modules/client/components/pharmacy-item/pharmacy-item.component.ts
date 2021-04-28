import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { FileService } from "src/app/core/services/file.service";
import { SubsidiaryFeedListRequest } from "src/app/shared/models/subsidiary-feed-list-request";

@Component({
  selector: "app-pharmacy-item",
  templateUrl: "./pharmacy-item.component.html",
  styleUrls: ["./pharmacy-item.component.scss"],
})
export class PharmacyItemComponent implements OnInit {
  @Input() subsidiary: SubsidiaryFeedListRequest;

  image: any;

  constructor(
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.fetchPharmPhoto();
  }

  fetchPharmPhoto() {
    this.fileService
      .getPharmacyPic(this.subsidiary.picture)
      .subscribe((result) => {
        let objectURL = URL.createObjectURL(result);
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
  }
}
