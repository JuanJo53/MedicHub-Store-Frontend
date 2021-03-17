import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "pharmacyStatus",
})
export class PharmacyStatusPipe implements PipeTransform {
  converted: string;

  transform(adminStatus: number): any {
    if (adminStatus == 1) {
      this.converted = "Habilitado";
    } else if (adminStatus == 0) {
      this.converted = "Deshabilitado";
    } else {
      this.converted = "Baneado";
    }
    return this.converted;
  }
}
