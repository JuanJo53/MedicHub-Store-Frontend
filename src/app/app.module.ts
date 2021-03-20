import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeModule } from "./modules/home/home.module";
import { CookieService } from "ngx-cookie-service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { SubsidiariesComponent } from "./modules/admin/pages/subsidiaries/subsidiaries.component";
import { SubsidiaryComponent } from "./modules/admin/components/subsidiary/subsidiary.component";
import { PharmAdminsComponent } from "./modules/admin/pages/pharm-admins/pharm-admins.component";
import { PharmAdminComponent } from "./modules/admin/components/pharm-admin/pharm-admin.component";
@NgModule({
  declarations: [AppComponent],
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
