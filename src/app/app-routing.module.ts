import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';

const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'login', component:LoginAdminComponent},
  {path:'register', component:RegisterAdminComponent},
 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
