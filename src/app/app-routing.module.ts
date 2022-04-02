import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { RegisterProvidersComponent } from './components/register-providers/register-providers.component';
import { BaseLayoutComponent } from './shared/components/layouts/base-layout/base-layout.component';

const baseLayoutRouting: Routes = [
    
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  
  
];

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: baseLayoutRouting
  },

  /*{
    path: 'addproduct',
    loadChildren: () => import('./components/addproduct/addproduct.module').then(m => m.AddproductModule)
  },*/
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },





  {path: '', redirectTo: '', pathMatch: 'full' },
  {path:'login', component:LoginAdminComponent},
  {path:'register', component:RegisterAdminComponent},
  {path:'register-providers', component:RegisterProvidersComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
