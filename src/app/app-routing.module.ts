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
    children: [
      {
        path: "admin/dashboard",
        canActivate: [AdminGuard],
        component: DashboardComponent,
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
    ],
  },
  {
    path: "",
    component: MainComponent,
    canActivate: [PharmAdminGuard],
    children: [
      {
        path: "pharmAdmin/dashboard",
        component: PharmDashboardComponent,
      },
      {
        path: "pharmAdmin/products",
        component: ProductsComponent,
      },
      {
        path: "pharmAdmin/brands",
        component: BrandsComponent,
      },
      {
        path: "pharmAdmin/bankAccount",
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
