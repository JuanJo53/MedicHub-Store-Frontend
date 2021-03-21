import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-subsidiary-detail",
  templateUrl: "./subsidiary-detail.component.html",
  styleUrls: ["./subsidiary-detail.component.scss"],
})
export class SubsidiaryDetailComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log("rendered");
  }
}
