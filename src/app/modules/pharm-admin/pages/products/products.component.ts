import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "src/app/core/http/pharm-admin/products.service";
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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log("OnInit excecuted");
    this.id = this.activatedRoute.snapshot.params.id;
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
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.name = result;
      this.ngOnInit();
    });
  }
  fecthProducts(id): void {
    this.productsServide.getAllProducts(id).subscribe((products) => {
      this.products = products;
      console.log(products);
    });
  }
}
