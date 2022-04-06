import { Component, OnInit } from '@angular/core';
import { ProductDetails } from 'src/app/models/ProductDetails';
import { HomeProductService } from 'src/app/service/home-product.service';
import { productsDB } from 'src/app/shared/data/products';

@Component({
  selector: 'll-dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.scss']
})
export class DashboardProductsComponent implements OnInit {
  view = 'list';

  products:ProductDetails[]=[];
  constructor(private homeProductService:HomeProductService) {}

  async ngOnInit(): Promise<void> {
    this.products = await this.loadData();
    console.log(this.products)
  }

  async loadData(){
    let respuesta;
    console.log("PRIMER METODO");
    let idProvider:number = parseInt(localStorage.getItem('userId'));
    await this.homeProductService.getListProductsByProviderId(idProvider).toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));
    
    return respuesta;
  }
}
