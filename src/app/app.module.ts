import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeModule } from "./modules/home/home.module";
import { CookieService } from "ngx-cookie-service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { CreditCardDirectivesModule } from "angular-cc-library";
import { CartPipe } from "./shared/pipes/cart.pipe";

@NgModule({
  declarations: [AppComponent, ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    CreditCardDirectivesModule,
  ],
  providers: [CookieService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
