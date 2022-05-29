import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProductComponent } from './edit-product.component';
import { EditProductRoutingModule } from './edit-product-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [EditProductComponent],
  imports: [CommonModule, SharedModule,EditProductRoutingModule,FormsModule,
    ReactiveFormsModule]
})
export class AddproductModule {}
