import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeModule } from "./modules/home/home.module";
import { CookieService } from "ngx-cookie-service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { HomeAdminModule } from "./modules/admin/homeAdmin.module";
import { ProductItemComponent } from "./modules/client/components/product-item/product-item.component";
import { PharmacyItemComponent } from "./modules/client/components/pharmacy-item/pharmacy-item.component";
import { CardItemComponent } from "./modules/client/components/card-item/card-item.component";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    HomeAdminModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
