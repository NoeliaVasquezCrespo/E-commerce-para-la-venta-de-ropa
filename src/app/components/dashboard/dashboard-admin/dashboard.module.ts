import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule} from '@angular/material/expansion';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { SharedModule } from '../../../shared/shared.module';
import { DashboardProductsComponent } from './dashboard-products/dashboard-products.component';
import { DashboardProvidersComponent } from './dashboard-providers/dashboard-providers.component';
import { MaterialModule } from '../../../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardInactiveProvidersComponent } from './dashboard-inactive-providers/dashboard-inactive-providers.component';
import { DashboardInactiveAdminComponent } from './dashboard-inactive-admin/dashboard-inactive-admin.component';
import { AddcategoryComponent } from './addcategory/addcategory.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EditProviderComponent } from './edit-provider/edit-provider.component';
import { DashboardOrdersComponent } from './dashboard-orders/dashboard-orders.component';
import { DashboardProductsReportComponent } from './dashboard-products-report/dashboard-products-report.component';
import { DashboardChartByCategoriesComponent } from './dashboard-chart-by-categories/dashboard-chart-by-categories.component';

import { DashboardChartByCatComponent } from './dashboard-chart-by-cat/dashboard-chart-by-cat.component';


  @NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardIndexComponent,
    DashboardProductsComponent,
    DashboardProvidersComponent,
    DashboardInactiveProvidersComponent,
    DashboardInactiveAdminComponent,
    AddcategoryComponent,
    EditProviderComponent,
    DashboardOrdersComponent,
    DashboardProductsReportComponent,
    DashboardChartByCategoriesComponent,
    DashboardChartByCatComponent
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, MatMenuModule,MatExpansionModule,MaterialModule,FormsModule, ReactiveFormsModule, MatCheckboxModule]

})
export class DashboardModule {}
