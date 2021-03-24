import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { TokenService } from "src/app/core/authentication/token.service";
import { ProductsService } from "src/app/core/http/pharm-admin/products.service";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { Product } from "src/app/shared/models/product";
import { CreateProductComponent } from "../../components/dialogs/create-product/create-product.component";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  id: number;
  name: string;

  constructor(
    public dialog: MatDialog,
    private productsServide: ProductsService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    console.log("OnInit excecuted");
    this.id = parseInt(this.tokenService.getUserName());
    try {
      if (this.id) {
        this.fecthProducts(this.id);
      }
    } catch (error) {
      console.error(error);
    }
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
        this.ngOnInit();
      }
    });
  }
  fecthProducts(id: number): void {
    this.products = [];
    this.productsServide.getSubsidiaryProducts(id).subscribe((products) => {
      this.products = products;
      console.log(products);
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
