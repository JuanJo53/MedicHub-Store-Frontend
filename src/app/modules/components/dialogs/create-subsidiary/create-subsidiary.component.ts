import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { SubsidiariesService } from "src/app/core/http/admin/subsidiaries.service";
import { SubsidiaryRequest } from "src/app/shared/models/subsidiary-request";

@Component({
  selector: "app-create-subsidiary",
  templateUrl: "./create-subsidiary.component.html",
  styleUrls: ["./create-subsidiary.component.scss"],
})
export class CreateSubsidiaryComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    private subsidiariesService: SubsidiariesService,
    public dialogRef: MatDialogRef<CreateSubsidiaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; id: number }
  ) {}

  ngOnInit(): void {
    this.editSubsidiary();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  editSubsidiary(): void {
    this.form = this.fromBuilder.group({
      subsidiaryId: [0, [Validators.required]],
      subsidiaryName: ["", [Validators.required, Validators.maxLength(100)]],
      phone: ["", [Validators.required, Validators.maxLength(45)]],
      email: [
        "",
        [Validators.required, Validators.email, Validators.maxLength(150)],
      ],
      number: ["", [Validators.required, Validators.maxLength(45)]],
      street: ["", [Validators.required, Validators.maxLength(150)]],
      zone: ["", [Validators.required, Validators.maxLength(150)]],
      city: ["", [Validators.required, Validators.maxLength(150)]],
      country: ["", [Validators.required, Validators.maxLength(150)]],
    });
    this.form.get("pharmacyId").setValue(this.data.id);
  }
  saveSubsidiary(): void {
    if (this.form.valid) {
      const subsidiary = this.form.value;
      this.createSubsidiary(subsidiary);
      this.dialogRef.close();
    } else {
      console.log("bad form");
    }
  }
  createSubsidiary(newSubsidiary: SubsidiaryRequest): void {
    // var iduser = parseInt(localStorage.getItem("userId"));
    this.subsidiariesService
      .postNewSubsidiary(newSubsidiary)
      .subscribe((subsidiary) => {
        console.log(subsidiary);
      });
  }
}
