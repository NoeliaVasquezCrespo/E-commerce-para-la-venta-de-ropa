import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { SharedModule } from '../../../shared/shared.module';
import { DashboardProductsComponent } from './dashboard-products/dashboard-products.component';
import { DashboardProvidersComponent } from './dashboard-providers/dashboard-providers.component';
import { ColorSizeRegisterComponent } from './color-size-register/color-size-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddoffersComponent } from './addoffers/addoffers.component';
@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardIndexComponent,
    DashboardProductsComponent,
    DashboardProvidersComponent,
    ColorSizeRegisterComponent,
    AddoffersComponent
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, MatMenuModule,FormsModule, ReactiveFormsModule]
})
export class DashboardModule {}
