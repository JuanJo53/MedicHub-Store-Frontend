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

const routes: Routes = [
  {
    path: "",
    redirectTo: "/admin",
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
    path: "admin",
    component: MainComponent,
    // canActivate: [AdminGuard],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "pharmacy",
        component: PharmaciesComponent,
      },
    ],
  },
  {
    path: "adminFarmacia",
    component: MainComponent,
    // canActivate: [AdminGuard],
    children: [
      {
        path: "dashboard",
        component: PharmDashboardComponent,
      },
      {
        path: "products",
        component: ProductsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
