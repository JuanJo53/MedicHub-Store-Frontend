import { Component, Input, OnInit } from "@angular/core";
import { PharmAdmin } from "src/app/shared/models/pharm-admin";

@Component({
  selector: "app-pharm-admins",
  templateUrl: "./pharm-admins.component.html",
  styleUrls: ["./pharm-admins.component.scss"],
})
export class PharmAdminsComponent implements OnInit {
  administrators: PharmAdmin[] = [];
  constructor() {}

  ngOnInit() {}
  addAdmin() {}
}
