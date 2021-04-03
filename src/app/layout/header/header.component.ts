import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "src/app/core/authentication/token.service";
import { CartService } from "src/app/core/services/cart.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  total$: Observable<number>;
  constructor(
    public tokenServide: TokenService,
    private cartService: CartService
  ) {
    this.total$ = this.cartService.cart$.pipe(
      map((products) => products.length)
    );
  }
  role: number;
  username: string;
  ngOnInit() {
    this.username = this.tokenServide.getUserName();
    this.role = parseInt(this.tokenServide.getAuthorities());
  }
}
