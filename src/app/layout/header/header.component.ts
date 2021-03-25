import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/core/authentication/token.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(public toeknServide: TokenService) {}
  role: number;
  ngOnInit() {
    this.role = parseInt(this.toeknServide.getAuthorities());
  }
}
