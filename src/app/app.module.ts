import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeModule } from "./modules/home/home.module";
import { CookieService } from "ngx-cookie-service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { CreateBranchComponent } from "./modules/pharm-admin/components/dialogs/create-branch/create-branch.component";
import { BankAccountComponent } from "./modules/pharm-admin/pages/bank-account/bank-account.component";
import { AddBankAccountComponent } from "./modules/pharm-admin/components/dialogs/add-bank-account/add-bank-account.component";
import { SuccesDialogComponent } from "./modules/components/dialogs/succes-dialog/succes-dialog.component";
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
