import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { TokenService } from "src/app/core/authentication/token.service";
import { ProductsService } from "src/app/core/http/pharm-admin/products.service";
import { SaleService } from "src/app/core/http/pharm-admin/sale.service";
import { ErrorDialogComponent } from "src/app/modules/components/dialogs/error-dialog/error-dialog.component";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { Product } from "src/app/shared/models/product";
import { ProductOrder } from "src/app/shared/models/product-order";
import { Sale } from "src/app/shared/models/sales";

@Component({
  selector: "app-create-sale",
  templateUrl: "./create-sale.component.html",
  styleUrls: ["./create-sale.component.scss"],
})
export class CreateSaleComponent implements OnInit {
  products: Product[];
  orderProducts: Product[] = [];
  saleProducts: ProductOrder[] = [];
  id: number;
  subsidiaryId: number;
  name: string;
  // isEditable = false;

  isLoadingResults = true;
  isRateLimitReached = false;

  length = 1;
  size = 9;
  order = "id";
  asc = true;
  actualPage = 0;

  form: FormGroup;

  totalAmount: number = 0;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private productService: ProductsService,
    private tokenService: TokenService,
    private saleService: SaleService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateSaleComponent>,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    try {
      this.id = parseInt(this.tokenService.getUserId());
      this.subsidiaryId = parseInt(this.tokenService.getSubsidiaryId());
      if (this.id) {
        this.fetchProducts(this.subsidiaryId, this.length);
        this.setSaleForm();
      }
    } catch (error) {
      console.error(error);
    }
  }
  setSaleForm(): void {
    this.form = this.formBuilder.group({
      nit: [
        "",
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(6),
        ],
      ],
      firstSurname: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      totalAmount: ["", [Validators.minLength(1)]],
      products: ["", [Validators.minLength(1)]],
    });
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  dataSource = new MatTableDataSource();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  totalUpdate(value: number) {
    this.totalAmount = this.totalAmount + value;
  }
  removeItem(productId: number) {
    console.log(productId);
    this.orderProducts = this.orderProducts.filter(
      (item) => item.productId !== productId
    );
  }
  fetchProducts(id: number, page: number): void {
    this.productService
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
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
      });
  }
  refreshProducts(event) {
    this.actualPage = event.pageIndex;
    this.fetchProducts(this.subsidiaryId, event.pageIndex + 1);
  }
  newSale() {
    if (this.form.valid) {
      if (this.orderProducts.length > 0) {
        this.orderProducts.forEach((order) => {
          delete order["brandId"];
          delete order["name"];
          delete order["brandName"];
          delete order["description"];
          delete order["dose"];
          delete order["price"];
          delete order["picture"];
          delete order["stock"];
          delete order["subsidiaryId"];
          delete order["total"];
          this.saleProducts.push(order);
        });
        this.form.get("totalAmount").setValue(this.totalAmount);
        this.form.get("products").setValue(this.saleProducts);
        const data = this.form.value;
        this.createSale(data);
      }
    } else {
      this.displayErrorDialog("¡Debe incluir almenos un producto!");
    }
  }
  createSale(newSale: Sale): void {
    this.saleService.postNewSale(newSale).subscribe((response) => {
      console.log(response);
      this.dialogRef.close(true);
    });
  }
  displayErrorDialog(text: string) {
    this.dialog.open(ErrorDialogComponent, {
      width: "300px",
      data: {
        message: text,
      },
    });
  }
}
