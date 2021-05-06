import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import { ProductsService } from "src/app/core/http/pharm-admin/products.service";
import { EventEmitterService } from "src/app/core/services/event-emitter.service";
import { FileService } from "src/app/core/services/file.service";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { Product } from "src/app/shared/models/product";

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  subsidiaryId: number;
  image: any;

  edit = false;
  destroyed = false;

  constructor(
    private productsServide: ProductsService,
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    try {
      const id = this.product.productId;
      if (id) {
        this.fetchProduct(id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  fetchProduct(id: number): void {
    this.productsServide.getProduct(id).subscribe((product) => {
      this.product = product;
      this.fetchProductPhoto();
    });
  }
  fetchProductPhoto() {
    if (this.product.picture != "null") {
      this.fileService.getUserPhoto(this.product.picture).subscribe((data) => {
        let objectURL = URL.createObjectURL(data);
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
    }
  }
  displaySuccesDialog(text: string) {
    const dialogRef = this.dialog.open(SuccesDialogComponent, {
      width: "500px",
      data: {
        message: text,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      window.location.reload();
    });
  }
}
