import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/core/authentication/token.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  userId: number;
  userRole: number;
  constructor(private tokenService: TokenService) {}

  ngOnInit() {
    this.userRole = parseInt(this.tokenService.getAuthorities());
  }
}
