import { CreateSaleComponent } from "./../../components/dialogs/create-sale/create-sale.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { TokenService } from "src/app/core/authentication/token.service";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { Sale } from "src/app/shared/models/sales";
import { SaleService } from "src/app/core/http/pharm-admin/sale.service";
import { SaleProductsComponent } from "../../components/dialogs/sale-products/sale-products.component";
import { SaleDetailsComponent } from "../../components/dialogs/sale-details/sale-details.component";

@Component({
  selector: "app-sales",
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.scss"],
})
export class SalesComponent implements OnInit {
  sales: Sale[] = [];

  isLoadingResults = true;
  isRateLimitReached = false;

  length = 1;
  size = 9;
  order = "id";
  asc = true;
  actualPage = 0;

  text: string;
  displayedColumns: string[] = [
    "id_sale",
    "Date",
    "Cost",
    "Client",
    "Nit",
    "Products",
  ];

  id: number;
  name: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private salesService: SaleService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.id = parseInt(this.tokenService.getSubsidiaryId());
    try {
      if (this.id) {
        this.fecthSales(this.id, this.length);
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

  addSales(): void {
    const dialogRef = this.dialog.open(CreateSaleComponent, {
      width: "3000px",
      height: "900px",
      data: {
        id: this.id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.displaySuccesDialog("¡Se registro la venta exitosamente!");
        this.fecthSales(this.id, this.actualPage + 1);
      }
    });
  }

  fecthSales(id: number, page: number): void {
    this.salesService
      .getSubsidiarySales(id, page, this.size, this.order, this.asc, 0, "price")
      .subscribe((sales) => {
        this.sales = sales;
        this.length = sales[0].size;
        this.dataSource = new MatTableDataSource(this.sales);
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
      });
  }

  refreshSales(event) {
    this.actualPage = event.pageIndex;
    this.fecthSales(this.id, event.pageIndex + 1);
  }
  productsView(products: any) {
    this.dialog.open(SaleProductsComponent, {
      width: "2050px",
      data: {
        products: products,
      },
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
}
