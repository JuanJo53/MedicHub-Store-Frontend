import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  MatDialogRef,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { TokenService } from "src/app/core/authentication/token.service";
import { ProductsService } from "src/app/core/http/pharm-admin/products.service";
import { Product } from "src/app/shared/models/product";

@Component({
  selector: "app-create-sale",
  templateUrl: "./create-sale.component.html",
  styleUrls: ["./create-sale.component.scss"],
})
export class CreateSaleComponent implements OnInit {
  // products$: Observable<Product[]>;
  products: Product[];
  id: number;
  subsidiaryId: number;
  name: string;
  isLinear = false;

  isLoadingResults = true;
  isRateLimitReached = false;

  length = 1;
  size = 9;
  order = "id";
  asc = true;
  actualPage = 0;

  form: FormGroup;

  orderTotal: number;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    // private cartService: CartService,
    private productServier: ProductsService,
    private tokenService: TokenService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateSaleComponent>
  ) {
    // this.products$ = this.cartService.cart$.pipe(
    //   map((products: []) => {
    //     const distintos = [...new Set(products)];
    //     this.orderProducts = products;
    //     this.orderProducts.forEach((prod) => {
    //       this.orderTotal = this.orderTotal + prod.price * prod.quantity;
    //     });
    //     return distintos;
    //   })
    // );
  }

  ngOnInit() {
    try {
      this.id = parseInt(this.tokenService.getUserId());
      this.subsidiaryId = parseInt(this.tokenService.getSubsidiaryId());
      if (this.id) {
        this.fetchProducts(this.subsidiaryId, this.length);
      }
    } catch (error) {
      console.error(error);
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  dataSource = new MatTableDataSource();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fetchProducts(id: number, page: number): void {
    this.productServier
      .getSubsidiaryProducts(
        id,
        page,
        this.size,
        this.order,
        this.asc,
        0,
        "price"
      )
      .subscribe((products) => {
        this.products = products;
        console.log(this.products);
        this.isLoadingResults = false;
      });
  }
  refreshProducts(event) {
    this.actualPage = event.pageIndex;
    this.fetchProducts(this.subsidiaryId, event.pageIndex + 1);
  }
}
