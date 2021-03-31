import { SubsidiaryDetailComponent } from "./modules/admin/pages/subsidiary-detail/subsidiary-detail.component";
import { AdminGuard } from "./core/guards/admin.guard";
import { MainComponent } from "./layout/main/main.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./modules/home/pages/login/login.component";
import { SignupComponent } from "./modules/home/pages/signup/signup.component";
import { DashboardComponent } from "./modules/admin/pages/dashboard/dashboard.component";
import { PharmaciesComponent } from "./modules/admin/pages/pharmacies/pharmacies.component";
import { ProductsComponent } from "./modules/pharm-admin/pages/products/products.component";
import { PharmDashboardComponent } from "./modules/pharm-admin/pages/pharm-dashboard/pharm-dashboard.component";
import { BrandsComponent } from "./modules/pharm-admin/pages/brands/brands.component";
import { BankAccountComponent } from "./modules/pharm-admin/pages/bank-account/bank-account.component";
import { PharmAdminGuard } from "./core/guards/pharm-admin.guard";
import { ReportsPageComponent } from "./modules/admin/pages/reports-page/reports-page.component";
import { ClientsPageComponent } from "./modules/admin/pages/clients-page/clients-page.component";
import { ClientProfilePageComponent } from "./modules/client/pages/client-profile-page/client-profile-page.component";
import { PharmaciesPageComponent } from "./modules/client/pages/pharmacies-page/pharmacies-page.component";
import { ClientCardsComponent } from "./modules/client/pages/client-cards/client-cards.component";
import { ClientGuard } from "./core/guards/client.guard";
import { ClientHomeComponent } from "./modules/client/pages/client-home/client-home.component";

const routes: Routes = [
  // {
  //   path: "**",
  //   redirectTo: "login",
  // },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "admin/dashboard",
        canActivate: [AdminGuard],
        component: DashboardComponent,
      },
      {
        path: "admin/reports",
        canActivate: [AdminGuard],
        component: ReportsPageComponent,
      },
      {
        path: "admin/pharmacy",
        canActivate: [AdminGuard],
        component: PharmaciesComponent,
      },
      {
        path: "admin/pharmacy/subsidiary/:id",
        canActivate: [AdminGuard],
        component: SubsidiaryDetailComponent,
      },
      {
        path: "admin/clients",
        canActivate: [AdminGuard],
        component: ClientsPageComponent,
      },
    ],
  },
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "pharmAdmin/dashboard",
        canActivate: [PharmAdminGuard],
        component: PharmDashboardComponent,
      },
      // {
      //   path: "pharmAdmin/reports",
      //   canActivate: [PharmAdminGuard],
      //   component: ProductsComponent,
      // },
      {
        path: "pharmAdmin/products",
        canActivate: [PharmAdminGuard],
        component: ProductsComponent,
      },
      {
        path: "pharmAdmin/brands",
        canActivate: [PharmAdminGuard],
        component: BrandsComponent,
      },
      {
        path: "pharmAdmin/bankAccount",
        canActivate: [PharmAdminGuard],
        component: BankAccountComponent,
      },
    ],
  },
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "client/home",
        canActivate: [ClientGuard],
        component: ClientHomeComponent,
      },
      {
        path: "client/account",
        canActivate: [ClientGuard],
        component: ClientProfilePageComponent,
      },
      {
        path: "client/pharmacies",
        canActivate: [ClientGuard],
        component: PharmaciesPageComponent,
      },
      // {
      //   path: "client/bill",
      // canActivate: [ClientGuard],
      //   component: BrandsComponent,
      // },
      {
        path: "client/creditCards",
        canActivate: [ClientGuard],
        component: ClientCardsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
