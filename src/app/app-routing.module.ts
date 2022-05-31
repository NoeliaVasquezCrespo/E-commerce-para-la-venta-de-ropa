import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { BaseLayoutComponent } from './shared/components/layouts/base-layout/base-layout.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
const baseLayoutRouting: Routes = [
    
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./components/app-home/client-home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./components/product/product.module').then(m => m.ProductModule)
  },
  
 
  
];

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: baseLayoutRouting
  },
 
  {
    path: 'authprovider',
    loadChildren: () => import('./components/auth-session/auth-provider/auth-provider.module').then(m => m.AuthProviderModule)
  },
  {
    path: 'authclient',
    loadChildren: () => import('./components/auth-session/auth-client/auth-client.module').then(m => m.AuthClientModule)
  },
  {
    path: 'addproduct',
    loadChildren: () => import('./components/product/addproduct/addproduct.module').then(m => m.AddproductModule)
  },
  {
    path: 'editproduct',
    loadChildren: () => import('./components/product/editproduct/editproduct.module').then(m => m.EditProductModule)
  },
  {
    path: 'adminhome',
    pathMatch: 'full',
    loadChildren: () => import('./components/app-home/admin-home/admin-home.module').then(m => m.AdminHomeModule)
  },
  {
    path: 'providerhome',
    pathMatch: 'full',
    loadChildren: () => import('./components/app-home/provider-home/provider-home.module').then(m => m.ProviderHomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth-session/auth-admin/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admindashboard',
    loadChildren: () => import('./components/dashboard/dashboard-admin/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'providerdashboard',
    loadChildren: () => import('./components/dashboard/dashboard-provider/dashboard.module').then(m => m.DashboardModule)
  },
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentComponent},




  {path: '', redirectTo: '', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
