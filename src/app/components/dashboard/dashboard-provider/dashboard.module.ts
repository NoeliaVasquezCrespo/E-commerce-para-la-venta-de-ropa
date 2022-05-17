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
import { ColorSizeRegisterComponent } from './color-size-register/color-size-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddoffersComponent } from './addoffers/addoffers.component';
import {MatTableModule} from '@angular/material/table';
import { MaterialModule } from '../../../material.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DashboardOffersComponent } from './dashboard-offers/dashboard-offers.component';
import { DashboardInactiveOffersComponent } from './dashboard-inactive-offers/dashboard-inactive-offers.component';
import { DashboardChartByCityComponent } from './dashboard-chart-by-city/dashboard-chart-by-city.component';
@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardIndexComponent,
    DashboardProductsComponent,
    DashboardProvidersComponent,
    ColorSizeRegisterComponent,
    AddoffersComponent,
    DashboardOffersComponent,
    DashboardInactiveOffersComponent,
    DashboardChartByCityComponent
  ],
  imports: [CommonModule, DashboardRoutingModule,MatExpansionModule, MaterialModule, SharedModule, MatMenuModule, FormsModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule]
})
export class DashboardModule {}
