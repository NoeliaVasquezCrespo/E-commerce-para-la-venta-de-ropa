import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetails } from 'src/app/models/ProductDetails';
import { HomeProductService } from 'src/app/service/home-product.service';

@Component({
  selector: 'll-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productDetail:ProductDetails;
  constructor(private homeService:HomeProductService,
    private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.productDetail=await this.getAllProductsData();
  }

  async getAllProductsData(){
    let respuesta;
    console.log("PRIMER METODO");
    const id = this.activatedRoute.snapshot.params.id;
    await this.homeService.getProductByProductId(id).toPromise().then((response) => {
      respuesta = response;
      console.log(respuesta);
    }).catch(e => console.error(e));

    return respuesta;
  }

}
