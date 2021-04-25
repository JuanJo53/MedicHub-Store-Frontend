import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "src/app/core/authentication/token.service";
import { CartService } from "src/app/core/services/cart.service";
import { map } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { ChangePasswordComponent } from "src/app/modules/client/components/dialogs/change-password/change-password.component";
import { FileService } from "src/app/core/services/file.service";
import { ErrorDialogComponent } from "src/app/modules/components/dialogs/error-dialog/error-dialog.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  total$: Observable<number>;
  role: number;
  username: string;

  constructor(
    public tokenServide: TokenService,
    private cartService: CartService,
    private fileService: FileService,
    public dialog: MatDialog
  ) {
    this.total$ = this.cartService.cart$.pipe(
      map((products) => products.length)
    );
  }

  ngOnInit() {
    this.username = this.tokenServide.getUserName();
    this.role = parseInt(this.tokenServide.getAuthorities());
  }
  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "OK") {
        this.displaySuccesDialog("¡Se cambio su contraseña exitosamente!");
      } else if (result == "BAD_REQUEST") {
        this.displayFailureDialog("¡Hubo un error al cambiar la contraseña!");
      }
    });
  }
  getAvatar() {
    const userId = this.tokenServide.getUserId();
    // this.fileService.getUserPhoto(userId)
  }
  displaySuccesDialog(text: string) {
    this.dialog.open(SuccesDialogComponent, {
      width: "500px",
      data: {
        message: text,
      },
    });
  }
  displayFailureDialog(text: string) {
    this.dialog.open(ErrorDialogComponent, {
      width: "500px",
      data: {
        message: text,
      },
    });
  }
}
