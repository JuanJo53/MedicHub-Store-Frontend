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
      firstName: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      firstSurname: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      secondSurname: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      ci: [
        "",
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(6),
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
          Validators.maxLength(50),
          Validators.minLength(6),
        ],
      ],
      userName: [
        "",
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(6),
        ],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(6),
        ],
      ],
      birthdate: ["", [Validators.required]],
      number: ["", [Validators.required, Validators.maxLength(15)]],
      street: [
        "",
        [
          Validators.required,
          Validators.maxLength(145),
          Validators.minLength(3),
        ],
      ],
      zone: [
        "",
        [
          Validators.required,
          Validators.maxLength(80),
          Validators.minLength(3),
        ],
      ],
      city: [
        "",
        [
          Validators.required,
          Validators.maxLength(80),
          Validators.minLength(3),
        ],
      ],
      country: [
        "",
        [
          Validators.required,
          Validators.maxLength(80),
          Validators.minLength(3),
        ],
      ],
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
        "¡Su registro se realizo correctamente! ¡Ahora puede iniciar sesión!"
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
