import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { ManageOrganizationsComponent } from 'src/app/components/manage-organizations/manage-organizations.component';
import { AuthGuard } from '../../guards/auth.guard';
import { EmployeeSettingsComponent } from '../../components/employee-settings/employee-settings.component';
import { ClientGridviewComponent } from '../../components/client-gridview/client-gridview.component';
import { CreateMemberComponent } from '../../components/create-member/create-member.component';
import { ManageInventoryItemsComponent } from 'src/app/components/manage-inventory-items/manage-inventory-items.component';
import { CreateAuditTemplateComponent } from '../../components/create-audit-template/create-audit-template.component';
import { AuditTemplateComponent } from '../../components/audit-template/audit-template.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard], // If user has a valid token he will be able to access comment page
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'create-members', component: CreateMemberComponent },
      { path: 'modify-members', component: ClientGridviewComponent },
      { path: 'sa-modify-members', component: ClientGridviewComponent },
      { path: 'manage-organizations', component: ManageOrganizationsComponent },
      { path: 'modify-members/:ID', component: EmployeeSettingsComponent },
      { path: 'settings', component: EmployeeSettingsComponent },
      { path: 'sa-settings', component: EmployeeSettingsComponent },
      { path: 'manage-items', component: ManageInventoryItemsComponent },
      { path: 'template', component: AuditTemplateComponent },
      { path: 'create-template', component: CreateAuditTemplateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AltaMainRoutingModule {}
