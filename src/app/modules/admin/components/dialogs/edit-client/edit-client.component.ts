import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TokenService } from "src/app/core/authentication/token.service";
import { ClientService } from "src/app/core/http/admin/client.service";
import { Client } from "src/app/shared/models/client";

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.component.html",
  styleUrls: ["./edit-client.component.scss"],
})
export class EditClientComponent implements OnInit {
  client: Client;
  form: FormGroup;
  subsidiaryId: number;

  constructor(
    private fromBuilder: FormBuilder,
    private clientService: ClientService,
    public dialogRef: MatDialogRef<EditClientComponent>,
    private tokenService: TokenService,
    @Inject(MAT_DIALOG_DATA)
    public data: { clientId: number }
  ) {}

  ngOnInit() {
    this.fetchClientDetails(this.data.clientId);
  }
  onNoClick(): void {
    this.form.controls["clientId"].setErrors({ incorrect: true });
    this.dialogRef.close(false);
  }

  fetchClientDetails(clientId: number) {
    this.clientService.getClientDetail(clientId).subscribe((client) => {
      this.client = client;
      this.editClient();
    });
  }
  editClient(): void {
    this.form = this.fromBuilder.group({
      clientId: [this.data.clientId, [Validators.required]],
      firstName: [
        this.client.firstName,
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      firstSurname: [
        this.client.firstSurname,
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      secondSurname: [
        this.client.secondSurname,
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      ci: [
        this.client.ci,
        [
          Validators.required,
          Validators.maxLength(145),
          Validators.minLength(6),
        ],
      ],
      phone: [
        this.client.phone,
        [
          Validators.required,
          Validators.maxLength(18),
          Validators.minLength(12),
        ],
      ],
      email: [
        this.client.email,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(150),
          Validators.minLength(6),
        ],
      ],
      userName: [
        this.client.userName,
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      password: [
        this.client.password,
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(6),
        ],
      ],
      birthdate: [
        this.client.birthdate,
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(6),
        ],
      ],
    });
  }
  saveClient(): void {
    if (this.form.valid) {
      const client = this.form.value;
      this.updateAdmin(client);
      this.dialogRef.close(true);
    } else {
      console.log("bad form");
    }
  }
  updateAdmin(client: Client): void {
    this.clientService.updateClient(client).subscribe((responseClient) => {
      console.log(responseClient);
    });
  }
}
