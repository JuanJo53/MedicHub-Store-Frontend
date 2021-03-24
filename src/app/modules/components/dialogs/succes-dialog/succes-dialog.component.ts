import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-succes-dialog",
  templateUrl: "./succes-dialog.component.html",
  styleUrls: ["./succes-dialog.component.scss"],
})
export class SuccesDialogComponent implements OnInit {
  constructor(
    public matDialogRef: MatDialogRef<SuccesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}
  ngOnInit(): void {}
  accept() {
    this.matDialogRef.close(true);
  }
}
