import { BrandService } from "src/app/core/http/pharm-admin/brand.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Brand } from "src/app/shared/models/brand";

@Component({
  selector: "app-create-branch",
  templateUrl: "./create-branch.component.html",
  styleUrls: ["./create-branch.component.scss"],
})
export class CreateBranchComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    private brandService: BrandService,
    public dialogRef: MatDialogRef<CreateBranchComponent>
  ) {}

  ngOnInit(): void {
    this.editPharm();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  editPharm(): void {
    this.form = this.fromBuilder.group({
      id: [0, [Validators.required]],
      name: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
    });
  }
  saveBrand(): void {
    if (this.form.valid) {
      const pharmacy = this.form.value;
      console.log(pharmacy);
      this.createPharmacy(pharmacy);
      this.dialogRef.close();
    }
  }
  createPharmacy(newBrand: Brand): void {
    var iduser = parseInt(localStorage.getItem("userId"));
    this.brandService.postNewBrand(newBrand).subscribe((brand) => {
      console.log(brand);
    });
  }
}
