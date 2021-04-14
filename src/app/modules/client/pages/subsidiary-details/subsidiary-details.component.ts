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
import { isFormattedError } from "@angular/compiler";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-subsidiary-details",
  templateUrl: "./subsidiary-details.component.html",
  styleUrls: ["./subsidiary-details.component.scss"],
})
export class SubsidiaryDetailsComponent implements OnInit {
  @Input() subsidiary: SubsidiaryRequest;

  products: Product[];

  filterTypes = ["Precio", "Nombre", "Tipo de Medicamento", "Dosis", "Marca"];

  isLoadingResults = true;
  isRateLimitReached = false;

  length = 1;
  size = 9;
  order = "id";
  asc = true;
  priceFilter = 0;

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
      this.priceFilter = 0;
      if (this.subsidiaryId) {
        this.getDetails(this.subsidiaryId);
        this.productService
          .getTotalProducts(this.subsidiaryId)
          .subscribe((element) => {
            this.length = element;
          });
      }
    } catch (error) {
      console.error(error);
    }
  }
  filterType: FormGroup;
  dataSource = new MatTableDataSource();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.filterType);
    if (filterValue) {
      this.priceFilter = parseFloat(filterValue);
    } else {
      this.priceFilter = 0;
    }
    this.getProducts(this.subsidiaryId, 1);
  }

  getDetails(id: number) {
    this.subsidiariesService
      .getSpecificSubsidiary(id)
      .subscribe((subsidiary) => {
        this.subsidiary = subsidiary;
        console.log(this.length);
        this.getProducts(id, this.length);
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
        this.priceFilter
      )
      .subscribe((products) => {
        this.products = products;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.sort = this.sort;
        console.log(this.products);
        this.isLoadingResults = false;
      });
  }
  refreshProducts(event) {
    console.log(event.pageIndex);
    this.getProducts(this.subsidiaryId, event.pageIndex + 1);
  }
}
