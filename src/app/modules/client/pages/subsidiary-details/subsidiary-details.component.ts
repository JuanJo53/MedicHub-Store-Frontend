import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { SubsidiariesService } from "src/app/core/http/admin/subsidiaries.service";
import { SubsidiaryRequest } from "src/app/shared/models/subsidiary-request";
import { MatTableDataSource } from "@angular/material/table";
import { Product } from "src/app/shared/models/product";
import { ProductsService } from "src/app/core/http/pharm-admin/products.service";

@Component({
  selector: "app-subsidiary-details",
  templateUrl: "./subsidiary-details.component.html",
  styleUrls: ["./subsidiary-details.component.scss"],
})
export class SubsidiaryDetailsComponent implements OnInit {
  @Input() subsidiary: SubsidiaryRequest;

  products: Product[];

  subsidiaryId: number;

  constructor(
    private fromBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private subsidiariesService: SubsidiariesService,
    private productService: ProductsService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.subsidiaryId = this.activatedRoute.snapshot.params.id;
    try {
      if (this.subsidiaryId) {
        this.getDetails(this.subsidiaryId);
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
        this.getProducts(id);
      });
  }
  getProducts(id: number) {
    this.products = [];
    this.productService.getSubsidiaryProducts(id).subscribe((products) => {
      this.products = products;
      this.dataSource = new MatTableDataSource(this.products);
      console.log(this.products);
    });
  }
}
