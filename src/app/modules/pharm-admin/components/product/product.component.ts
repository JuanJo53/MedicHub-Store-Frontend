import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { BrandService } from "src/app/core/http/pharm-admin/brand.service";
import { ProductsService } from "src/app/core/http/pharm-admin/products.service";
import { WarningDialogComponent } from "src/app/modules/admin/components/warning-dialog/warning-dialog.component";
import { Brand } from "src/app/shared/models/brand";
import { Product } from "src/app/shared/models/product";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  brands: Brand[] = [];
  subsidiaryId: number;
  form: FormGroup;

  edit = false;
  destroyed = false;

  constructor(
    private fromBuilder: FormBuilder,
    private productsServide: ProductsService,
    private brandsService: BrandService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subsidiaryId = this.activatedRoute.snapshot.params.id;
    const id = this.product.productId;
    if (id) {
      this.fetchProduct(id);
    }
    this.fecthBrands();
  }
  ngOnDestroy(): void {
    this.destroyed = true;
  }
  cancel() {
    this.edit = false;
  }
  fetchProduct(id: number): void {
    this.productsServide.getProduct(id).subscribe((product) => {
      this.product = product;
    });
  }
  editProduct(): void {
    this.edit = true;
    this.form = this.fromBuilder.group({
      productId: [0, [Validators.required]],
      subsidiaryId: [0, [Validators.required]],
      brandId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      stock: ["", [Validators.required]],
      price: ["", [Validators.required]],
      type: ["", [Validators.required]],
      dose: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
    this.form.get("subsidiaryId").setValue(this.subsidiaryId);
  }
  saveProduct(event: Event, id: number): void {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      product.productId = id;
      this.updateProduct(id, product);
    } else {
      console.log("Bad form");
    }
    this.cancel();
  }
  updateProduct(id: number, updateProduct: Product): void {
    this.productsServide.updateProduct(updateProduct).subscribe((product) => {
      console.log("Producto: ");
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
  fecthBrands(): void {
    this.brandsService.getBrands().subscribe((bands) => {
      this.brands = bands;
      console.log(bands);
    });
  }
}
