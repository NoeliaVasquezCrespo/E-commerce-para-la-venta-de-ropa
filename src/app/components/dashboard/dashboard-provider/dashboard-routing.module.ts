import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardProvidersComponent } from './dashboard-providers/dashboard-providers.component';
import { DashboardProductsComponent } from './dashboard-products/dashboard-products.component';
import { ColorSizeRegisterComponent } from './color-size-register/color-size-register.component';
import { AddoffersComponent } from './addoffers/addoffers.component';
import { DashboardOffersComponent } from './dashboard-offers/dashboard-offers.component';
import { DashboardInactiveOffersComponent } from './dashboard-inactive-offers/dashboard-inactive-offers.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DashboardChartByCityComponent } from './dashboard-chart-by-city/dashboard-chart-by-city.component';
const DashboardChildrenRoute: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardIndexComponent
  },
  {
    path: 'saved-items',
    component: DashboardProductsComponent
  },
  {
    path: 'orders',
    component: DashboardProvidersComponent
  },
  {
    path: 'offers/:id',
    component: AddoffersComponent
  },
  {
    path: 'chart-city',
    component: DashboardChartByCityComponent
  },
  {
    path: 'offers-list',
    component: DashboardOffersComponent
  },
  {
    path: 'inactive-offers-list',
    component: DashboardInactiveOffersComponent
  },

  {
    path: 'color-size',
    component: ColorSizeRegisterComponent
  },
  {
    path: 'chart-by-city',
    component: DashboardChartByCityComponent,
  }
];

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: DashboardChildrenRoute
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
