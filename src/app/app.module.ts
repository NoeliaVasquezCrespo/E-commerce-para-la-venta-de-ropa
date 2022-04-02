import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './components/products/products.component';
import { DetailsproductComponent } from './components/detailsproduct/detailsproduct.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { RegisterProvidersComponent } from './components/register-providers/register-providers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    RegisterAdminComponent,
    ProductsComponent,
    DetailsproductComponent,
    ProductsListComponent,
    RegisterProvidersComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  SharedModule, NgxSkeletonLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
