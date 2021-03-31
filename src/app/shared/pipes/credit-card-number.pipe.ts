import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "creditCardNumber",
})
export class CreditCardNumberPipe implements PipeTransform {
  converted: string;
  transform(cardNumber: number): any {
    this.converted = cardNumber.toString();
    const visibleDigits = 4;
    let maskedSection = this.converted.slice(0, -visibleDigits);
    let visibleSection = this.converted.slice(-visibleDigits);
    return maskedSection.replace(/./g, "*") + visibleSection;
    // return this.converted
    //   .replace(/\s+/g, '')
    //   .replace(/(\d{4})/g, '$1 ')
    //   .trim();
  }
}
