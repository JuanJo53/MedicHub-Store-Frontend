import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeModule } from "./modules/home/home.module";
import { CookieService } from "ngx-cookie-service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { PharmaciesComponent } from './modules/client/pages/pharmacies/pharmacies.component';
import { ProfileComponent } from './modules/client/pages/profile/profile.component';
import { CreditCardsComponent } from './modules/client/pages/credit-cards/credit-cards.component';
@NgModule({
  declarations: [AppComponent, PharmaciesComponent, ProfileComponent, CreditCardsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
