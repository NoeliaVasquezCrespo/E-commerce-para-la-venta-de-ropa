import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddproductRoutingModule } from './addproduct-routing.module';
import { AddproductComponent } from './addproduct.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AddproductComponent],
  imports: [CommonModule, AddproductRoutingModule, SharedModule]
})
export class AddproductModule {}
