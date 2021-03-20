import { Subsidiary } from "./../../../../shared/models/subsidiary";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-subsidiary",
  templateUrl: "./subsidiary.component.html",
  styleUrls: ["./subsidiary.component.scss"],
})
export class SubsidiaryComponent implements OnInit {
  @Input() subsidiary: Subsidiary;
  constructor() {}

  ngOnInit() {}
}
