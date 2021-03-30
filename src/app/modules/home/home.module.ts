import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSidenavModule } from "@angular/material";
import { HeaderComponent } from "./../../layout/header/header.component";
import { FooterComponent } from "./../../layout/footer/footer.component";
import { LoginComponent } from "./../../modules/home/pages/login/login.component";
import { HomeComponent } from "./../../modules/home/pages/home/home.component";
import { LayoutComponent } from "./../../layout/layout.component";
import { MainComponent } from "./../../layout/main/main.component";
import { SidebarComponent } from "./../../layout/sidebar/sidebar.component";
import { BrowserModule } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { SignupComponent } from "./pages/signup/signup.component";
import { WarningDialogComponent } from "../components/dialogs/warning-dialog/warning-dialog.component";
import { PharmDashboardComponent } from "../pharm-admin/pages/pharm-dashboard/pharm-dashboard.component";
import { ProductsComponent } from "../pharm-admin/pages/products/products.component";
import { CreateProductComponent } from "../pharm-admin/components/dialogs/create-product/create-product.component";
import { MatSelectModule } from "@angular/material/select";
import { ProductComponent } from "./../pharm-admin/components/product/product.component";
import { MatTableModule } from "@angular/material/table";
import { BrandComponent } from "../pharm-admin/components/brand/brand.component";
import { BrandsComponent } from "../pharm-admin/pages/brands/brands.component";
import { CreateBranchComponent } from "../pharm-admin/components/dialogs/create-branch/create-branch.component";
import { BankAccountComponent } from "../pharm-admin/pages/bank-account/bank-account.component";
import { MatRadioModule } from "@angular/material/radio";
import { AddBankAccountComponent } from "../pharm-admin/components/dialogs/add-bank-account/add-bank-account.component";
import { SuccesDialogComponent } from "../components/dialogs/succes-dialog/succes-dialog.component";
import { ClientProfilePageComponent } from "../client/pages/client-profile-page/client-profile-page.component";
import { ClientCardsComponent } from "../client/pages/client-cards/client-cards.component";
import { PharmaciesPageComponent } from "../client/pages/pharmacies-page/pharmacies-page.component";
import { ProductsPageComponent } from "../client/pages/products-page/products-page.component";
import { DashboardComponent } from "../admin/pages/dashboard/dashboard.component";
import { PharmaciesComponent } from "../admin/pages/pharmacies/pharmacies.component";
import { CreatePharmacyComponent } from "../admin/components/dialogs/create-pharmacy/create-pharmacy.component";
import { PharmacyComponent } from "../admin/components/pharmacy/pharmacy.component";
import { PharmacyStatusPipe } from "src/app/shared/pipes/pharmacy-status.pipe";
import { SubsidiaryComponent } from "../admin/components/subsidiary/subsidiary.component";
import { CreateSubsidiaryComponent } from "../admin/components/dialogs/create-subsidiary/create-subsidiary.component";
import { SubsidiaryDetailComponent } from "../admin/pages/subsidiary-detail/subsidiary-detail.component";
import { CreateSubsiAdminComponent } from "../admin/components/dialogs/create-subsi-admin/create-subsi-admin.component";
import { EditSubsiAdminsComponent } from "../admin/components/dialogs/edit-subsi-admins/edit-subsi-admins.component";
import { ClientsPageComponent } from "../admin/pages/clients-page/clients-page.component";
import { ReportsPageComponent } from "../admin/pages/reports-page/reports-page.component";
import { EditClientComponent } from "../admin/components/dialogs/edit-client/edit-client.component";
@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LayoutComponent,
    MainComponent,
    SidebarComponent,
    SignupComponent,
    WarningDialogComponent,
    ProductsComponent,
    CreateProductComponent,
    CreateProductComponent,
    ProductComponent,
    BrandComponent,
    BrandsComponent,
    CreateBranchComponent,
    BankAccountComponent,
    AddBankAccountComponent,
    SuccesDialogComponent,
    PharmDashboardComponent,
    ClientProfilePageComponent,
    ClientCardsComponent,
    PharmaciesPageComponent,
    ProductsPageComponent,
    DashboardComponent,
    PharmaciesComponent,
    CreatePharmacyComponent,
    PharmacyComponent,
    PharmacyStatusPipe,
    SubsidiaryComponent,
    CreateSubsidiaryComponent,
    SubsidiaryDetailComponent,
    CreateSubsiAdminComponent,
    EditSubsiAdminsComponent,
    ClientsPageComponent,
    ReportsPageComponent,
    EditClientComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    NoopAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatTableModule,
    MatRadioModule,
  ],
  entryComponents: [
    LoginComponent,
    SignupComponent,
    CreateProductComponent,
    WarningDialogComponent,
    CreateProductComponent,
    CreateBranchComponent,
    AddBankAccountComponent,
    SuccesDialogComponent,
    CreatePharmacyComponent,
    CreateSubsidiaryComponent,
    CreateSubsiAdminComponent,
    EditSubsiAdminsComponent,
    EditClientComponent,
  ],
})
export class HomeModule {}
