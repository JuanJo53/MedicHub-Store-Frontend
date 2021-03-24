import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { PharmaciesService } from "src/app/core/http/admin/pharmacies.service";
import { PharmacyRequest } from "src/app/shared/models/pharmacy-request";

@Component({
  selector: "app-create-pharmacy",
  templateUrl: "./create-pharmacy.component.html",
  styleUrls: ["./create-pharmacy.component.scss"],
})
export class CreatePharmacyComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    private pharmaciesService: PharmaciesService,
    public dialogRef: MatDialogRef<CreatePharmacyComponent>
  ) {}

  ngOnInit(): void {
    this.editPharm();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  editPharm(): void {
    this.form = this.fromBuilder.group({
      pharmacyId: [0, [Validators.required]],
      name: [
        "",
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(8),
        ],
      ],
      phone: [
        "",
        [
          Validators.required,
          Validators.maxLength(18),
          Validators.minLength(12),
        ],
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(150),
          Validators.minLength(6),
        ],
      ],
      // picture: ["", [Validators.required]],
    });
  }
  savePharmacy(): void {
    if (this.form.valid) {
      const pharmacy = this.form.value;
      console.log(pharmacy);
      this.createPharmacy(pharmacy);
      this.dialogRef.close();
    }
  }
  createPharmacy(newPharmacy: PharmacyRequest): void {
    var iduser = parseInt(localStorage.getItem("userId"));
    this.pharmaciesService
      .postNewPharmacy(newPharmacy)
      .subscribe((pharmacy) => {
        console.log(pharmacy);
      });
  }
}
