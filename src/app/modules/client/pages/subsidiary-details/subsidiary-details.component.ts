import { Component, Input, OnInit, ViewChild } from "@angular/core";
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
  size = 9;
  order = "id";
  asc = true;

  filter: any;
  filterType: string;

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
    try {
      this.subsidiaryId = this.activatedRoute.snapshot.params.id;
      this.filter = "";
      if (this.subsidiaryId) {
        this.getProductTotal();
        this.filterType = "all";
        this.getDetails(this.subsidiaryId);
        this.getProducts(this.subsidiaryId, 1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  dataSource = new MatTableDataSource();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.filterType == "all") {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.getProductTotal();
    } else {
      this.getProducts(this.subsidiaryId, 1);
    }
  }
  getProductTotal() {
    this.productService
      .getTotalProducts(this.subsidiaryId)
      .subscribe((element) => {
        this.length = element;
      });
  }
  getDetails(id: number) {
    this.subsidiariesService
      .getSpecificSubsidiary(id)
      .subscribe((subsidiary) => {
        this.subsidiary = subsidiary;
        console.log(this.length);
        this.filter = "";
      });
  }
  getProducts(id: number, page: number) {
    this.isLoadingResults = true;
    this.productService
      .getSubsidiaryProducts(
        id,
        page,
        this.size,
        this.order,
        this.asc,
        this.filter,
        this.filterType
      )
      .subscribe((products) => {
        if (products != null) {
          this.products = products;
          this.dataSource = new MatTableDataSource(this.products);
          this.dataSource.sort = this.sort;
          this.length = this.products.length;
          this.isRateLimitReached = false;
        } else {
          this.isRateLimitReached = true;
        }
      });
    this.isLoadingResults = false;
    if (this.filterType == "all") {
      this.filter = "";
      this.getProductTotal();
    }
  }
  refreshProducts(event) {
    console.log(event.pageIndex);
    this.getProducts(this.subsidiaryId, event.pageIndex + 1);
  }
}
