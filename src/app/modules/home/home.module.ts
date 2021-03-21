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
import { MatButtonModule } from "@angular/material/button";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { SignupComponent } from "./pages/signup/signup.component";
import { DashboardComponent } from "../admin/pages/dashboard/dashboard.component";
import { PharmaciesComponent } from "../admin/pages/pharmacies/pharmacies.component";
import { CreatePharmacyComponent } from "../components/dialogs/create-pharmacy/create-pharmacy.component";
import { PharmacyComponent } from "../admin/components/pharmacy/pharmacy.component";
import { PharmacyStatusPipe } from "src/app/shared/pipes/pharmacy-status.pipe";
import { MatMenuModule } from "@angular/material/menu";
import { WarningDialogComponent } from "../admin/components/warning-dialog/warning-dialog.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { PharmDashboardComponent } from "../pharm-admin/pages/pharm-dashboard/pharm-dashboard.component";
import { ProductsComponent } from "../pharm-admin/pages/products/products.component";
import { CreateProductComponent } from "../pharm-admin/components/dialogs/create-product/create-product.component";
import { MatSelectModule } from "@angular/material/select";
import { SubsidiaryComponent } from "../admin/components/subsidiary/subsidiary.component";
import { PharmAdminsComponent } from "../admin/pages/pharm-admins/pharm-admins.component";
import { PharmAdminComponent } from "../admin/components/pharm-admin/pharm-admin.component";
import { ProductosComponent } from "../admin/pages/productos/productos.component";
import { CreateSubsidiaryComponent } from "../components/dialogs/create-subsidiary/create-subsidiary.component";
import { SubsidiaryDetailComponent } from "../admin/pages/subsidiary-detail/subsidiary-detail.component";
import { CreateSubsiAdminComponent } from "../components/dialogs/create-subsi-admin/create-subsi-admin.component";
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
    DashboardComponent,
    PharmaciesComponent,
    CreatePharmacyComponent,
    PharmacyComponent,
    PharmacyStatusPipe,
    WarningDialogComponent,
    PharmDashboardComponent,
    ProductsComponent,
    CreateProductComponent,
    SubsidiaryComponent,
    PharmAdminsComponent,
    PharmAdminComponent,
    ProductosComponent,
    CreateSubsidiaryComponent,
    SubsidiaryDetailComponent,
    CreateSubsiAdminComponent,
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
  ],
  entryComponents: [
    LoginComponent,
    SignupComponent,
    CreatePharmacyComponent,
    CreateProductComponent,
    WarningDialogComponent,
    CreateSubsidiaryComponent,
    CreateSubsiAdminComponent,
  ],
})
export class HomeModule {}
