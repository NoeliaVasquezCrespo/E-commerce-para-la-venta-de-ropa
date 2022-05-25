import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-client-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, SignupComponent,EditClientComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule, 
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class AuthClientModule { }
