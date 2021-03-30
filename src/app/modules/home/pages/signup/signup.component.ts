import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/core/http/user/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Client } from "src/app/shared/models/client";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  Client: Client;
  constructor(
    private fromBuilder: FormBuilder,
    private userService: UserService,
    //private router: Router

   ) {}

  ngOnInit(): void {
    this.editClient();
  }
  editClient(): void {
    this.form = this.fromBuilder.group({
      clientId: [0, [Validators.required]],
      firstName: ["", [Validators.required]],
      firstSurname: ["", [Validators.required]],
      secondSurname: ["", [Validators.required]],
      ci: ["", [Validators.required]],
      phone: ["", [Validators.required,Validators.maxLength(18),Validators.minLength(12)]],
      email: ["", [Validators.required, Validators.email]],
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]],
      birthdate: ["", [Validators.required]],
      number:[0, [Validators.required]],
      street:["", [Validators.required]],
      zone: ["", [Validators.required]],
      city: ["", [Validators.required]],
      country: ["", [Validators.required]],
    });
  }
  saveClient(): void {
    if (this.form.valid) {
      const client = this.form.value;
      console.log(client);
      this.createClient(client);
    }
  }
  createClient(newClient: Client): void {
    this.userService.postNewClient(newClient).subscribe();

  }
}
