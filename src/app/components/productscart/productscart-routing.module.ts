import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductscartComponent } from './productscart.component';

const routes: Routes = [
  {
    path: '',
    component: ProductscartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductscartRoutingModule {}
