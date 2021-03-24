import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { PharmAdminsService } from "src/app/core/http/admin/pharm-admins.service";
import { SubsidiariesService } from "src/app/core/http/admin/subsidiaries.service";
import { CreateSubsiAdminComponent } from "src/app/modules/components/dialogs/create-subsi-admin/create-subsi-admin.component";
import { SubsidiaryRequest } from "src/app/shared/models/subsidiary-request";
import { WarningDialogComponent } from "../../components/warning-dialog/warning-dialog.component";
import { MatTableDataSource } from "@angular/material/table";
import { PharmAdminList } from "src/app/shared/models/pharm-admin-list";
import { EditSubsiAdminsComponent } from "src/app/modules/components/dialogs/edit-subsi-admins/edit-subsi-admins.component";

@Component({
  selector: "app-subsidiary-detail",
  templateUrl: "./subsidiary-detail.component.html",
  styleUrls: ["./subsidiary-detail.component.scss"],
})
export class SubsidiaryDetailComponent implements OnInit {
  @Input() subsidiary: SubsidiaryRequest;

  admins: PharmAdminList[];

  text: string;
  id: number;
  form: FormGroup;

  displayedColumns: string[] = [
    "id_usuario",
    "Name",
    "FirstSurname",
    "SecondSurname",
    "Ci",
    "id_userEdit",
    "id_userDel",
  ];

  constructor(
    private fromBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private subsidiariesService: SubsidiariesService,
    private pharmAdminsService: PharmAdminsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    try {
      if (this.id) {
        this.getDetails(this.id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  dataSource = new MatTableDataSource();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDetails(id: number) {
    this.subsidiariesService
      .getSpecificSubsidiary(id)
      .subscribe((subsidiary) => {
        this.subsidiary = subsidiary;
        console.log("subsidiaries reached");
        this.editSubsidiary(id);
        this.getAdmins(this.id);
      });
  }
  getAdmins(id: number) {
    this.admins = [];
    this.pharmAdminsService.getAdmins(id).subscribe((administrator) => {
      this.admins = administrator;
      this.dataSource = new MatTableDataSource(this.admins);
      console.log(this.admins);
    });
  }
  saveChanges(event: Event, id: number): void {
    event.preventDefault();
    if (this.form.valid) {
      const pharm = this.form.value;
      pharm.pharmacyId = id;
      this.updateSubsidiary(id, pharm);
    } else {
      console.log("Bad form");
    }
  }
  updateSubsidiary(id: number, updateSubsidiary: SubsidiaryRequest): void {
    this.subsidiariesService
      .updateSubsidiary(id, updateSubsidiary)
      .subscribe((subsidiary) => {
        console.log("subsidiary: ");
        console.log(subsidiary);
        this.getAdmins(id);
      });
  }
  deleteAdmin(id: number): void {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: "500px",
      data: {
        message:
          "¿Esta seguro que desea eliminar la cuente de este administrador?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pharmAdminsService.deleteAdmins(id).subscribe((rta) => {
          console.log("Resultado " + rta);
        });
        console.log("Deleted");
        this.ngOnInit();
      }
    });
  }
  editSubsidiary(id: number): void {
    this.form = this.fromBuilder.group({
      subsidiaryId: [0, [Validators.required]],
      subsidiaryName: [
        "",
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(6),
        ],
      ],
      phone: [
        "",
        [Validators.required, Validators.maxLength(18)],
        Validators.minLength(12),
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(150),
          Validators.minLength(6),
        ],
      ],
      number: ["", [Validators.maxLength(45), Validators.minLength(2)]],
      street: [
        "",
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      zone: [
        "",
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      city: [
        "",
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      country: [
        "",
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
    });
    this.form.get("subsidiaryId").setValue(id);
    this.form.get("subsidiaryName").setValue(this.subsidiary.subsidiaryName);
    this.form.get("phone").setValue(this.subsidiary.phone);
    this.form.get("email").setValue(this.subsidiary.email);
    this.form.get("number").setValue(this.subsidiary.number);
    this.form.get("street").setValue(this.subsidiary.street);
    this.form.get("zone").setValue(this.subsidiary.zone);
    this.form.get("city").setValue(this.subsidiary.city);
    this.form.get("country").setValue(this.subsidiary.country);
  }
  addAdmin() {
    const dialogRef = this.dialog.open(CreateSubsiAdminComponent, {
      width: "500px",
      data: {
        id: this.id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.text = result;
      this.ngOnInit();
    });
  }
  openDetailDialog(adminId: number) {
    const dialogRef = this.dialog.open(EditSubsiAdminsComponent, {
      width: "500px",
      data: {
        id: adminId,
        subsidiaryId: this.id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.text = result;
      this.ngOnInit();
    });
  }
}
