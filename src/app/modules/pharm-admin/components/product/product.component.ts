import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ProductsService } from "src/app/core/http/pharm-admin/products.service";
import { WarningDialogComponent } from "src/app/modules/admin/components/warning-dialog/warning-dialog.component";
import { Product } from "src/app/shared/models/product";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  form: FormGroup;

  edit = false;
  destroyed = false;

  constructor(
    private fromBuilder: FormBuilder,
    private productsServide: ProductsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // const id = this.product.productId;
    // if (id) {
    //   this.fetchSubsidiaries(id);
    // }
  }
  ngOnDestroy(): void {
    this.destroyed = true;
  }
  cancel() {
    this.edit = false;
  }
  editProduct(): void {
    this.edit = true;
    this.form = this.fromBuilder.group({
      pharmacyId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      // picture: ["", [Validators.required]],
    });
  }
  saveProduct(event: Event, id: number): void {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      product.productId = id;
      this.updateProduct(id, product);
      this.cancel();
    } else {
      console.log("Bad form");
    }
  }
  updateProduct(id: number, updateProduct: Product): void {
    this.productsServide
      .updateProduct(id, updateProduct)
      .subscribe((product) => {
        console.log("Farmacia: ");
        console.log(product);
      });
  }
  deleteProduct(id: number): void {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: "500px",
      data: {
        message: "¿Esta seguro que desea eliminar el producto?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productsServide.deleteProduct(id).subscribe((rta) => {
          console.log("Resultado " + rta);
        });
        console.log("Deleted");
        this.ngOnDestroy();
      }
    });
  }
}
