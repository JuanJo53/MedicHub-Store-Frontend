import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { SubsidiariesService } from "src/app/core/http/admin/subsidiaries.service";
import { Subsidiary } from "src/app/shared/models/subsidiary";

@Component({
  selector: "app-subsidiary-detail",
  templateUrl: "./subsidiary-detail.component.html",
  styleUrls: ["./subsidiary-detail.component.scss"],
})
export class SubsidiaryDetailComponent implements OnInit {
  @Input() subsidiary: Subsidiary;

  form: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    private subsidiariesService: SubsidiariesService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const id = this.subsidiary.subsidiaryId;
    if (id) {
      this.getDetails(id);
    }
  }
  getDetails(id: number) {
    this.subsidiariesService
      .getSpecificSubsidiary(id)
      .subscribe((subsidiary) => {
        console.log(subsidiary);
      });
  }
}
