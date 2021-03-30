import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Client } from "src/app/shared/models/client";
import { ClientService } from "src/app/core/http/admin/client.service";
import { Router } from "@angular/router";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MAT_DATE_FORMATS } from "@angular/material";
import { DatePipe } from "@angular/common";

export const MY_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "YYYY",
  },
};
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  Client: Client;
  constructor(
    private fromBuilder: FormBuilder,
    private userService: ClientService,
    private router: Router,
    public dialog: MatDialog,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.editClient();
  }
  editClient(): void {
    this.form = this.fromBuilder.group({
      firstName: ["", [Validators.required]],
      firstSurname: ["", [Validators.required]],
      secondSurname: ["", [Validators.required]],
      ci: ["", [Validators.required]],
      phone: [
        "",
        [
          Validators.required,
          Validators.maxLength(18),
          Validators.minLength(12),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]],
      birthdate: ["", [Validators.required]],
      number: [0, [Validators.required]],
      street: ["", [Validators.required]],
      zone: ["", [Validators.required]],
      city: ["", [Validators.required]],
      country: ["", [Validators.required]],
    });
  }

  saveClient(): void {
    if (this.form.valid) {
      const client = this.form.value;
      let date = this.datepipe.transform(
        this.form.get("birthdate").value.toString(),
        "yyyy-MM-dd"
      );
      client.birthdate = date;
      console.log(client);
      this.createClient(client);
    } else {
      console.log("Algo salio mal");
    }
  }
  createClient(newClient: Client): void {
    this.userService.postNewClient(newClient).subscribe((client) => {
      console.log(client);
      this.router.navigate(["/", "login"]);
      this.displaySuccesDialog(
        "¡Su registro se realizo correctamente! ¡Ahora puede iniciar secion!"
      );
    });
  }
  displaySuccesDialog(text: string) {
    this.dialog.open(SuccesDialogComponent, {
      width: "500px",
      data: {
        message: text,
      },
    });
  }
}
