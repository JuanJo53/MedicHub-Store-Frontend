import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BrandService } from "src/app/core/http/pharm-admin/brand.service";
import { ProductsService } from "src/app/core/http/pharm-admin/products.service";
import { Brand } from "src/app/shared/models/brand";
import { Product } from "src/app/shared/models/product";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"],
})
export class CreateProductComponent implements OnInit {
  brands: Brand[] = [];
  form: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    private prodcutService: ProductsService,
    private brandsService: BrandService,
    public dialogRef: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    this.fecthBrands();
    this.editProduct();
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  editProduct(): void {
    this.form = this.fromBuilder.group({
      subsidiaryId: [0, [Validators.required]],
      brandId: [0, [Validators.required]],
      name: [
        "",
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      stock: [
        "",
        [Validators.required, Validators.min(2), Validators.max(800)],
      ],
      price: ["", [Validators.required]],
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
    this.form.get("subsidiaryId").setValue(this.data.id);
    this.form.get("brandId").setValue(1);
  }
  saveProduct(): void {
    if (this.form.valid) {
      const pharmacy = this.form.value;
      console.log(pharmacy);
      this.createPharmacy(pharmacy);
      this.dialogRef.close(true);
    }
  }
  createPharmacy(newProduct: Product): void {
    this.prodcutService.postNewProduct(newProduct).subscribe((prodcut) => {
      console.log(prodcut);
    });
  }
  fecthBrands(): void {
    this.brandsService.getBrands().subscribe((bands) => {
      this.brands = bands;
      console.log(bands);
    });
  }
}
