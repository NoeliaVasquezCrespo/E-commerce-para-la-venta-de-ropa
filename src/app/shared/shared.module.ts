import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FeatureComponent } from './components/feature/feature.component';
import { MatCardModule } from '@angular/material/card';
import { BaseLayoutComponent } from './components/layouts/base-layout/base-layout.component';;
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HttpClientModule } from '@angular/common/http';

const commonModules = [
  HttpClientModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatListModule
];

@NgModule({
  declarations: [HeaderComponent,  FeatureComponent, BaseLayoutComponent, SidenavComponent],
  imports: [CommonModule, RouterModule, ...commonModules],
  exports: [HeaderComponent,  BaseLayoutComponent, FeatureComponent, SidenavComponent, ...commonModules]
})
export class SharedModule {}
