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
import { DomSanitizer } from "@angular/platform-browser";
import { ClientService } from "src/app/core/http/admin/client.service";
import { EventEmitterService } from "src/app/core/services/event-emitter.service";
import { PharmAdminsService } from "src/app/core/http/admin/pharm-admins.service";
import { AdminService } from "src/app/core/http/admin/admin.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  total$: Observable<number>;
  role: number;
  username: string;
  image: any;
  userId: number;
  imageUrl: string;

  constructor(
    public tokenServide: TokenService,
    private cartService: CartService,
    private clientService: ClientService,
    private pharmAdminService: PharmAdminsService,
    private adminService: AdminService,
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    private eventEmitterService: EventEmitterService,
    public dialog: MatDialog
  ) {
    this.total$ = this.cartService.cart$.pipe(
      map((products) => products.length)
    );
  }

  ngOnInit() {
    this.username = this.tokenServide.getUserName();
    this.role = parseInt(this.tokenServide.getAuthorities());
    this.userId = parseInt(this.tokenServide.getUserId());
    this.getDetails(this.userId);
    if (this.role == 3) {
      this.eventEmitterService.clientSubs = this.eventEmitterService.clientPhotoEvent.subscribe(
        (name: string) => {
          this.getDetails(this.userId);
          console.log(name);
        }
      );
    } else if (this.role == 2) {
      this.eventEmitterService.pharmSubs = this.eventEmitterService.pharmPhotoEvent.subscribe(
        (name: string) => {
          this.getDetails(this.userId);
        }
      );
    } else if (this.role == 1) {
      this.eventEmitterService.adminSubs = this.eventEmitterService.adminPhotoEvent.subscribe(
        (name: string) => {
          this.getDetails(this.userId);
        }
      );
    }
  }
  getDetails(id: number) {
    this.username = this.tokenServide.getUserName();
    if (this.role == 3) {
      this.clientService.getClientDetail(id).subscribe((client) => {
        this.imageUrl = client.picture;
        this.username = client.userName;
        this.fetchUserPhoto();
      });
    }
    if (this.role == 2) {
      this.pharmAdminService.getAdminDetail(id).subscribe((data) => {
        this.imageUrl = data.picture;
        this.fetchUserPhoto();
      });
    }
    if (this.role == 1) {
      this.adminService.getAdminDetail(id).subscribe((data) => {
        this.imageUrl = data.picture;
        this.fetchUserPhoto();
      });
    }
  }
  fetchUserPhoto() {
    this.fileService.getUserPhoto(this.imageUrl).subscribe((data) => {
      let objectURL = URL.createObjectURL(data);
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
  getCartProducts() {
    this.cartService.fetchProducts(this.userId);
  }
}
