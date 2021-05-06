import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CartService } from "src/app/core/services/cart.service";
import { FileService } from "src/app/core/services/file.service";
import { Product } from "src/app/shared/models/product";
import { ProductOrder } from "src/app/shared/models/product-order";

@Component({
  selector: "app-sale-item",
  templateUrl: "./sale-item.component.html",
  styleUrls: ["./sale-item.component.scss"],
})
export class SaleItemComponent implements OnInit {
  @Input() product: Product;
  @Input() products: Product[];
  @Input() typeItem: boolean;
  @Output() addItemEvent = new EventEmitter<number>();

  image: any;
  productTotalPrice: number;

  constructor(
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.fetchProductPhoto();
    this.productTotalPrice = this.product.price * this.product.quantity;
  }
  getProductQuantity() {
    this.productTotalPrice = this.product.price * this.product.quantity;
  }
  fetchProductPhoto() {
    this.fileService.getUserPhoto(this.product.picture).subscribe((data) => {
      let objectURL = URL.createObjectURL(data);
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
  addProduct() {
    this.product.total = this.productTotalPrice;
    this.products.push(this.product);
    this.addItemEvent.emit(this.productTotalPrice);
  }
  removeProduct() {
    // this.product.total = this.productTotalPrice;
    // this.products.push(this.product);
    // this.addItemEvent.emit(this.productTotalPrice);
    console.log("quitado");
  }
}
