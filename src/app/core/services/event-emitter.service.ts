import { EventEmitter, Injectable } from "@angular/core";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EventEmitterService {
  pharmPhotoEvent = new EventEmitter();
  clientPhotoEvent = new EventEmitter();
  pharmSubs: Subscription;
  clientSubs: Subscription;

  constructor() {}

  onClientPhotoUpdated(message: string) {
    this.clientPhotoEvent.emit(message);
  }
  onPharmacyPhotoUpdated(message: string) {
    this.pharmPhotoEvent.emit(message);
  }
}
