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
import { DashboardInactiveAdminComponent } from './dashboard-inactive-admin/dashboard-inactive-admin.component'

  @NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardIndexComponent,
    DashboardProductsComponent,
    DashboardProvidersComponent,
    DashboardInactiveProvidersComponent,
    DashboardInactiveAdminComponent
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, MatMenuModule,MatExpansionModule,MaterialModule]

})
export class DashboardModule {}