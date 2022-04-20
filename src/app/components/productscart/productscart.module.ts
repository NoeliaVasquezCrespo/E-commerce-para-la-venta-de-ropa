import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductscartRoutingModule } from './productscart-routing.module';
import { ProductsCartComponent } from './productscart.component';
import { SharedModule } from '../../shared/shared.module';
import { NgParticlesModule } from 'ng-particles';

@NgModule({
  declarations: [ProductsCartComponent],
  imports: [CommonModule, ProductscartRoutingModule, SharedModule, NgParticlesModule]
})
export class ProductscartModule {}
