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
    await this.getFotoImages();
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
  async getFotoImages(){
    console.log("ACCESO A METODO DE IMAGEN")
    let cad=await this.addImage(this.productDetail.idProducto)
    let arrCad:string[]=cad.split("/");
    this.productDetail.image=`http://localhost:8080/products/image/${arrCad[0]}/${arrCad[1]}`
    console.log("la cadena es: "+this.productDetail.image);
    console.log(this.productDetail);
  }
  async addImage(idProducto:number){
    let cadena;
    await this.homeService.getFirstImageByProductId(idProducto).toPromise().then((response) => {
      console.log("LA RESPUESTA ES: ");
      console.log(response.foto);
      cadena=response.foto
    }).catch(e => console.error(e));

    return cadena;
  }

}
