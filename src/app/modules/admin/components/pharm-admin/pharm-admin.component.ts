import { Component, Input, OnInit } from "@angular/core";
import { PharmAdmin } from "src/app/shared/models/pharm-admin";

@Component({
  selector: "app-pharm-admin",
  templateUrl: "./pharm-admin.component.html",
  styleUrls: ["./pharm-admin.component.scss"],
})
export class PharmAdminComponent implements OnInit {
  @Input() admin: PharmAdmin;
  constructor() {}

  ngOnInit() {}
}
