import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsCartComponent } from './productscart.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsCartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductscartRoutingModule {}
