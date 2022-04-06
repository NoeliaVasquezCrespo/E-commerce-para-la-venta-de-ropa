import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardProvidersComponent } from './dashboard-providers/dashboard-providers.component';
import { DashboardProductsComponent } from './dashboard-products/dashboard-products.component';
import { DashboardCompanyComponent } from './dashboard-company/dashboard-company.component';
import { ValidarTokenGuard } from '../../auth-session/auth-admin/guard/validar-token.guard';

const DashboardChildrenRoute: Routes = [
  {
    path: '',
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
    path: 'company',
    component: DashboardCompanyComponent
  }
];

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: DashboardChildrenRoute
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
