import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CartService } from "src/app/core/services/cart.service";
import { FileService } from "src/app/core/services/file.service";
import { Product } from "src/app/shared/models/product";

@Component({
  selector: "app-sale-item",
  templateUrl: "./sale-item.component.html",
  styleUrls: ["./sale-item.component.scss"],
})
export class SaleItemComponent implements OnInit {
  @Input() product: Product;
  @Input() products: Product[];
  @Output() addItemEvent = new EventEmitter<number>();
  image: any;

  productTotalPrice: number;

  constructor(
    private cartService: CartService,
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.fetchProductPhoto();
  }
  getProductQuantity() {
    // var total = 0;
    // this.product.quantity = total;
    this.productTotalPrice = this.product.price * this.product.quantity;
    // console.log(this.productTotalPrice);
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
}
