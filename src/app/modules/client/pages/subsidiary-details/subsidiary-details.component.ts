import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { SubsidiariesService } from "src/app/core/http/admin/subsidiaries.service";
import { SubsidiaryRequest } from "src/app/shared/models/subsidiary-request";
import { MatTableDataSource } from "@angular/material/table";
import { Product } from "src/app/shared/models/product";
import { ProductsService } from "src/app/core/http/pharm-admin/products.service";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-subsidiary-details",
  templateUrl: "./subsidiary-details.component.html",
  styleUrls: ["./subsidiary-details.component.scss"],
})
export class SubsidiaryDetailsComponent implements OnInit {
  @Input() subsidiary: SubsidiaryRequest;

  products: Product[];

  isLoadingResults = true;
  isRateLimitReached = false;

  length = 1;
  size = 30;
  order = "id";
  asc = true;

  subsidiaryId: number;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private activatedRoute: ActivatedRoute,
    private subsidiariesService: SubsidiariesService,
    private productService: ProductsService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.subsidiaryId = this.activatedRoute.snapshot.params.id;
    try {
      this.productService.getTotalProducts().subscribe((element) => {
        this.length = element;
      });
      if (this.subsidiaryId) {
        this.getDetails(this.subsidiaryId, this.length);
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

  getDetails(id: number, page: number) {
    this.subsidiariesService
      .getSpecificSubsidiary(id)
      .subscribe((subsidiary) => {
        this.subsidiary = subsidiary;
        this.getProducts(id, this.length);
      });
  }
  getProducts(id: number, page) {
    this.isLoadingResults = true;
    this.productService
      .getSubsidiaryProducts(id, page, this.size, this.order, this.asc)
      .subscribe((products) => {
        this.products = products;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.sort = this.sort;
        console.log(this.products);
        this.isLoadingResults = false;
      });
  }
  refreshClients(event) {
    console.log(event.pageIndex);
    this.getProducts(this.subsidiaryId, event.pageIndex + 1);
  }
}
