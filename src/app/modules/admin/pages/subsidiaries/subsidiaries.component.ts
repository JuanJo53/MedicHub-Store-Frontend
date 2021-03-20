import { Component, OnInit } from "@angular/core";
import { Subsidiary } from "src/app/shared/models/subsidiary";

@Component({
  selector: "app-subsidiaries",
  templateUrl: "./subsidiaries.component.html",
  styleUrls: ["./subsidiaries.component.scss"],
})
export class SubsidiariesComponent implements OnInit {
  subsidiaries: Subsidiary[] = [];
  constructor() {}

  ngOnInit() {}
  addSubsidiary() {}
}
