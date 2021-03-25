import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-warning-dialog",
  templateUrl: "./warning-dialog.component.html",
  styleUrls: ["./warning-dialog.component.scss"],
})
export class WarningDialogComponent implements OnInit {
  buttonMessage: string = "Si";
  constructor(
    public matDialogRef: MatDialogRef<WarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}
  ngOnInit(): void {}
  accept() {
    this.matDialogRef.close(true);
  }
  cancel() {
    this.matDialogRef.close(false);
  }
}
