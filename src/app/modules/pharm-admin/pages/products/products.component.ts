import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { TokenService } from "src/app/core/authentication/token.service";
import { ProductsService } from "src/app/core/http/pharm-admin/products.service";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { Product } from "src/app/shared/models/product";
import { CreateProductComponent } from "../../components/dialogs/create-product/create-product.component";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  isLoadingResults = true;
  isRateLimitReached = false;

  length = 1;
  size = 9;
  order = "id";
  asc = true;
  actualPage = 0;

  id: number;
  name: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private productsServide: ProductsService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    console.log("OnInit excecuted");
    this.id = parseInt(this.tokenService.getSubsidiaryId());
    try {
      if (this.id) {
        this.fecthProducts(this.id, this.length);
        this.productsServide.getTotalProducts(this.id).subscribe((element) => {
          this.length = element;
        });
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
  addProduct(): void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: "500px",
      data: {
        id: this.id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.displaySuccesDialog("¡Se agrego el producto exitosamente!");
        this.fecthProducts(this.id, this.actualPage + 1);
      }
    });
  }
  fecthProducts(id: number, page: number): void {
    this.productsServide
      .getSubsidiaryProducts(id, page, this.size, this.order, this.asc)
      .subscribe((products) => {
        this.products = products;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.sort = this.sort;
        console.log(this.products);
        this.isLoadingResults = false;
      });
  }
  refreshProducts(event) {
    this.actualPage = event.pageIndex;
    this.fecthProducts(this.id, event.pageIndex + 1);
  }
  displaySuccesDialog(text: string) {
    this.dialog.open(SuccesDialogComponent, {
      width: "500px",
      data: {
        message: text,
      },
    });
  }
}
