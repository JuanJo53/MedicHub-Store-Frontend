import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeModule } from "./modules/home/home.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { DatePipe, DecimalPipe } from "@angular/common";
import { CreditCardDirectivesModule } from "angular-cc-library";
import { CartPipe } from "./shared/pipes/cart.pipe";
import { PharmReportsPageComponent } from "./modules/pharm-admin/pages/pharm-reports-page/pharm-reports-page.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    CreditCardDirectivesModule,
  ],
  providers: [DatePipe, DecimalPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
