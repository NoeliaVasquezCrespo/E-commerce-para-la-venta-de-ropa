import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardProvidersComponent } from './dashboard-providers/dashboard-providers.component';
import { DashboardProductsComponent } from './dashboard-products/dashboard-products.component';
import { DashboardCompanyComponent } from './dashboard-company/dashboard-company.component';
import { ValidarTokenGuard } from '../../auth-session/auth-admin/guard/validar-token.guard';
import { DashboardInactiveProvidersComponent } from './dashboard-inactive-providers/dashboard-inactive-providers.component';
import { DashboardInactiveAdminComponent } from './dashboard-inactive-admin/dashboard-inactive-admin.component';
import { AddcategoryComponent } from './addcategory/addcategory.component'
import { EditProviderComponent } from './edit-provider/edit-provider.component';

const DashboardChildrenRoute: Routes = [
  {
    path: 'admins',
    pathMatch: 'full',
    component: DashboardIndexComponent,
    canLoad: [ ValidarTokenGuard ],
    canActivate: [ ValidarTokenGuard ],
    
  },
  {
    path: 'products',
    component: DashboardProductsComponent
  },
  {
    path: 'providers',
    component: DashboardProvidersComponent
  },
  {
    path: 'inactiveproviders',
    component: DashboardInactiveProvidersComponent 
  },
  {
    path: 'inactiveadmins',
    component: DashboardInactiveAdminComponent
  },
  {
    path: 'company',
    component: DashboardCompanyComponent
<<<<<<< HEAD
  },{
    path: 'category/:id',
=======
  },
  {
    path: 'category',
>>>>>>> 7f0d4edc87b2603894dcd5a11c6b77bb9a2ee53c
    component: AddcategoryComponent 
  },
  


];

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: DashboardChildrenRoute
  },
  {
    path: 'edit-provider',
    component: EditProviderComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
