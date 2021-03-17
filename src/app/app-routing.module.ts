import { MainComponent } from "./layout/main/main.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./modules/home/pages/home/home.component";
import { LoginComponent } from "./modules/home/pages/login/login.component";

const routes: Routes = [
  {
    path: "admin",
    component: LoginComponent,
  },
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "admin",
        component: HomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
