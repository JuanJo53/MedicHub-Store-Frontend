import { TokenService } from "src/app/core/authentication/token.service";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { BrandService } from "src/app/core/http/pharm-admin/brand.service";
import { ProductsService } from "src/app/core/http/pharm-admin/products.service";
import { WarningDialogComponent } from "src/app/modules/components/dialogs/warning-dialog/warning-dialog.component";
import { Brand } from "src/app/shared/models/brand";
import { Product } from "src/app/shared/models/product";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { FileService } from "src/app/core/services/file.service";
import { DomSanitizer } from "@angular/platform-browser";
import { EventEmitterService } from "src/app/core/services/event-emitter.service";

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
  productId: number;

  edit = false;
  destroyed = false;
  image: any;

  constructor(
    private fromBuilder: FormBuilder,
    private productsServide: ProductsService,
    private brandsService: BrandService,
    private tokenService: TokenService,
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subsidiaryId = parseInt(this.tokenService.getSubsidiaryId());
    const id = this.product.productId;
    this.productId = this.product.productId;
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
      this.fetchProductPhoto();
    });
  }
  fetchProductPhoto() {
    this.fileService.getProductPic(this.product.picture).subscribe((result) => {
      let objectURL = URL.createObjectURL(result);
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
  photoRefresh(value: string) {
    this.fetchProduct(this.product.productId);
    this.displaySuccesDialog(value);
  }
  setBrandId(brandName: string) {
    this.brands.forEach((brand) => {
      if (brand.name == brandName) {
        this.product.brandId = brand.brandId;
        console.log(brand.name);
        console.log(brand.brandId);
      }
    });
  }
  editProduct(productId: number): void {
    this.edit = true;
    this.setBrandId(this.product.brandName);
    console.log(this.product.brandId);
    this.form = this.fromBuilder.group({
      productId: [productId, [Validators.required]],
      subsidiaryId: [this.subsidiaryId, [Validators.required]],
      brandId: [this.product.brandId, [Validators.required]],
      name: [
        "",
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      stock: ["", [Validators.required, Validators.min(2)]],
      price: ["", [Validators.required, Validators.min(0.1)]],
      type: [
        "",
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(4),
        ],
      ],
      dose: [
        "",
        [
          Validators.required,
          Validators.maxLength(45),
          Validators.minLength(4),
        ],
      ],
      description: [
        "",
        [
          Validators.required,
          Validators.maxLength(280),
          Validators.minLength(10),
        ],
      ],
    });
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
      this.displaySuccesDialog("¡Se actualizo el producto exitosamente!");
      this.ngOnInit();
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
        this.displaySuccesDialog("¡Se elimino el producto exitosamente!");
        this.ngOnDestroy();
      }
    });
  }
  fecthBrands(): void {
    this.brandsService.getBrands().subscribe((bands) => {
      this.brands = bands;
    });
  }
  displaySuccesDialog(text: string) {
    const dialogRef = this.dialog.open(SuccesDialogComponent, {
      width: "500px",
      data: {
        message: text,
      },
    });
  }
}
