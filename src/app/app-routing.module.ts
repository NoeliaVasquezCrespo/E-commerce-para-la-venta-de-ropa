import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { ProductsComponent } from './components/products/products.component';
import { DetailsproductComponent } from './components/detailsproduct/detailsproduct.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { RegisterProvidersComponent } from './components/register-providers/register-providers.component';



const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'login', component:LoginAdminComponent},
  {path:'register', component:RegisterAdminComponent},
  {path:'register-products', component:ProductsComponent},
  {path:'details:id', component:DetailsproductComponent},
  {path:'home', component:HomeComponent},
  {path:'list', component:ProductsListComponent},
  {path:'register-providers', component:RegisterProvidersComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
