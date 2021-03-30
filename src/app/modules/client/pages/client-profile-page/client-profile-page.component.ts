import { TokenService } from "src/app/core/authentication/token.service";
import { ClientService } from "src/app/core/http/admin/client.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Client } from "src/app/shared/models/client";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-client-profile-page",
  templateUrl: "./client-profile-page.component.html",
  styleUrls: ["./client-profile-page.component.scss"],
})
export class ClientProfilePageComponent implements OnInit {
  client: Client;

  text: string;
  id: number;
  form: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private tokenService: TokenService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.id = parseInt(this.tokenService.getAuthorities());
    try {
      if (this.id) {
        this.getDetails(this.id);
      }
    } catch (error) {
      console.error(error);
    }
  }
  getDetails(id: number) {
    this.clientService.getClientDetail(id).subscribe((client) => {
      this.client = client;
      console.log("client details reached");
      console.log(client);
      // this.editClient(id);
      // this.getAdress(this.id);
    });
  }
}
