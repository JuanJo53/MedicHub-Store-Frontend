import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSidenavModule } from "@angular/material";
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
import { DashboardComponent } from "../admin/pages/dashboard/dashboard.component";
import { PharmaciesComponent } from "../admin/pages/pharmacies/pharmacies.component";
import { PharmacyComponent } from "../admin/components/pharmacy/pharmacy.component";
import { PharmacyStatusPipe } from "src/app/shared/pipes/pharmacy-status.pipe";
import { WarningDialogComponent } from "../components/dialogs/warning-dialog/warning-dialog.component";
import { MatSelectModule } from "@angular/material/select";
import { SubsidiaryComponent } from "../admin/components/subsidiary/subsidiary.component";
import { CreateSubsidiaryComponent } from "../admin/components/dialogs/create-subsidiary/create-subsidiary.component";
import { SubsidiaryDetailComponent } from "../admin/pages/subsidiary-detail/subsidiary-detail.component";
import { MatTableModule } from "@angular/material/table";
import { MatRadioModule } from "@angular/material/radio";
import { SuccesDialogComponent } from "../components/dialogs/succes-dialog/succes-dialog.component";
import { CreatePharmacyComponent } from "../admin/components/dialogs/create-pharmacy/create-pharmacy.component";
import { CreateSubsiAdminComponent } from "../admin/components/dialogs/create-subsi-admin/create-subsi-admin.component";
import { EditSubsiAdminsComponent } from "../admin/components/dialogs/edit-subsi-admins/edit-subsi-admins.component";
import { ClientsPageComponent } from "../admin/pages/clients-page/clients-page.component";
import { ReportsPageComponent } from "../admin/pages/reports-page/reports-page.component";
import { EditClientComponent } from "../admin/components/dialogs/edit-client/edit-client.component";
import { HomeComponent } from "../home/pages/home/home.component";
import { HeaderComponent } from "src/app/layout/header/header.component";
import { FooterComponent } from "src/app/layout/footer/footer.component";
import { HomeAdminRoutingModule } from "./homeAdminRouting.module";
@NgModule({
  declarations: [
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
    HomeAdminRoutingModule,
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
    CreatePharmacyComponent,
    CreateSubsidiaryComponent,
    CreateSubsiAdminComponent,
    EditSubsiAdminsComponent,
    EditClientComponent,
  ],
})
export class HomeAdminModule {}
