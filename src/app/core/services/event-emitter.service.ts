import { EventEmitter, Injectable } from "@angular/core";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EventEmitterService {
  pharmPhotoEvent = new EventEmitter();
  clientPhotoEvent = new EventEmitter();
  productPhotoEvent = new EventEmitter();
  pharmSubs: Subscription;
  clientSubs: Subscription;
  productSubs: Subscription;

  constructor() {}

  onClientPhotoUpdated(message: string) {
    this.clientPhotoEvent.emit(message);
  }
  onPharmacyPhotoUpdated(message: string) {
    this.pharmPhotoEvent.emit(message);
  }
  onProductPhotoUpdated(message: string) {
    this.productPhotoEvent.emit(message);
  }
}
