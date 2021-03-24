import { SubsidiaryDetailComponent } from "./modules/admin/pages/subsidiary-detail/subsidiary-detail.component";
import { AdminGuard } from "./core/guards/admin.guard";
import { MainComponent } from "./layout/main/main.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./modules/home/pages/home/home.component";
import { LoginComponent } from "./modules/home/pages/login/login.component";
import { SignupComponent } from "./modules/home/pages/signup/signup.component";
import { DashboardComponent } from "./modules/admin/pages/dashboard/dashboard.component";
import { PharmaciesComponent } from "./modules/admin/pages/pharmacies/pharmacies.component";
import { ProductsComponent } from "./modules/pharm-admin/pages/products/products.component";
import { PharmDashboardComponent } from "./modules/pharm-admin/pages/pharm-dashboard/pharm-dashboard.component";
import { BrandsComponent } from "./modules/pharm-admin/pages/brands/brands.component";
import { BankAccountComponent } from "./modules/pharm-admin/pages/bank-account/bank-account.component";

const routes: Routes = [
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
    // canActivate: [AdminGuard],
    children: [
      {
        path: "admin/dashboard",
        component: DashboardComponent,
      },
      {
        path: "admin/pharmacy",
        component: PharmaciesComponent,
      },
      {
        path: "admin/pharmacy/subsidiary/:id",
        component: SubsidiaryDetailComponent,
      },
    ],
  },
  {
    path: "",
    component: MainComponent,
    // canActivate: [AdminGuard],
    children: [
      {
        path: "pharmAdmin/dashboard",
        component: PharmDashboardComponent,
      },
      {
        path: "pharmAdmin/:id/products",
        component: ProductsComponent,
      },
      {
        path: "pharmAdmin/:id/brands",
        component: BrandsComponent,
      },
      {
        path: "pharmAdmin/:id/bankAccount",
        component: BankAccountComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
