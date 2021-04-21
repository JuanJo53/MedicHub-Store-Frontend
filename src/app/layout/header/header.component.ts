import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "src/app/core/authentication/token.service";
import { CartService } from "src/app/core/services/cart.service";
import { map } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { ChangePasswordComponent } from "src/app/modules/client/components/dialogs/change-password/change-password.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  total$: Observable<number>;
  constructor(
    public tokenServide: TokenService,
    private cartService: CartService,
    public dialog: MatDialog
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
  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.displaySuccesDialog("¡Se cambio su contraseña exitosamente!");
      }
    });
  }
  displaySuccesDialog(text: string) {
    this.dialog.open(SuccesDialogComponent, {
      width: "500px",
      data: {
        message: text,
      },
    });
  }
}
