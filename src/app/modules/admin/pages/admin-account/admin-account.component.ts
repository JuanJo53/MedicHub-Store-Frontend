import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import { TokenService } from "src/app/core/authentication/token.service";
import { AdminService } from "src/app/core/http/admin/admin.service";
import { PharmAdminsService } from "src/app/core/http/admin/pharm-admins.service";
import { EventEmitterService } from "src/app/core/services/event-emitter.service";
import { FileService } from "src/app/core/services/file.service";
import { ChangePasswordComponent } from "src/app/modules/client/components/dialogs/change-password/change-password.component";
import { ErrorDialogComponent } from "src/app/modules/components/dialogs/error-dialog/error-dialog.component";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { Administrator } from "src/app/shared/models/admin";

@Component({
  selector: "app-admin-account",
  templateUrl: "./admin-account.component.html",
  styleUrls: ["./admin-account.component.scss"],
})
export class AdminAccountComponent implements OnInit {
  admin: Administrator;
  image: any;

  text: string;
  id: number;
  form: FormGroup;

  editEnabled = false;
  constructor(
    private fromBuilder: FormBuilder,
    private adminService: AdminService,
    private tokenService: TokenService,
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    private eventEmitterService: EventEmitterService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log("init");
    try {
      this.id = parseInt(this.tokenService.getUserId());
      if (this.id) {
        this.getDetails(this.id, 1);
      }
      this.eventEmitterService.adminSubs = this.eventEmitterService.adminPhotoEvent.subscribe(
        (msg: string) => {
          this.getDetails(this.id, 2);
          if (msg == "¡La foto se actualizo exitosamente!") {
            this.displaySuccesDialog(msg);
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
  ngOnDestroy() {
    console.log("destroyed");
    // this.eventEmitterService.clientPhotoEvent.unsubscribe();
  }
  cancel() {
    this.editEnabled = false;
  }
  getDetails(id: number, type: number) {
    this.adminService.getAdminDetail(id).subscribe((data) => {
      console.log("hola");
      this.admin = data;
      this.tokenService.setUserName(data.userName);
      if (type == 1) {
        this.eventEmitterService.onAdminPhotoUpdated(
          this.tokenService.getUserName()
        );
      }
      this.fetchUserPhoto();
    });
  }
  fetchUserPhoto() {
    this.fileService.getUserPhoto(this.admin.picture).subscribe((data) => {
      let objectURL = URL.createObjectURL(data);
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
  editAdmin(): void {
    this.editEnabled = true;
    this.form = this.fromBuilder.group({
      adminId: [this.id, [Validators.required]],
      firstName: [
        this.admin.firstName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      firstSurname: [
        this.admin.firstSurname,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      secondSurname: [
        this.admin.secondSurname,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      ci: [
        this.admin.ci,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(6),
        ],
      ],
      phone: [
        this.admin.phone,
        [
          Validators.required,
          Validators.maxLength(18),
          Validators.minLength(12),
        ],
      ],
      email: [
        this.admin.email,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(50),
          Validators.minLength(6),
        ],
      ],
      userName: [
        this.admin.userName,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(6),
        ],
      ],
    });
  }
  saveAdmin(): void {
    if (this.form.valid) {
      const admin = this.form.value;
      this.updateAdmin(admin);
    } else {
      console.log("bad form");
    }
  }
  updateAdmin(admin: Administrator): any {
    this.adminService.updateAdmin(admin).subscribe((response) => {
      this.editEnabled = false;
      this.displaySuccesDialog("¡Sus datos se actualizaron exitosamente!");
      this.ngOnInit();
    });
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
