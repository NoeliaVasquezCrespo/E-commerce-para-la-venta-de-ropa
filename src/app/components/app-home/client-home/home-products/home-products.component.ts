import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { HomeProductService } from 'src/app/service/home-product.service';
import { ProductDetails } from 'src/app/models/ProductDetails';
@Component({
  selector: 'll-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {
  products:ProductDetails[] = [];
  cad:string;
  constructor(private homeProductService:HomeProductService) { 
    //this.products = productsDB.Product;
    
    
  }


  async ngOnInit():Promise<void>{ 
    this.products = await this.getAllProductsData();
    
    await this.getFotoImages();

    
  }
  async getAllProductsData(){
    let respuesta;
    console.log("PRIMER METODO");
    await this.homeProductService.getListProducts().toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));

    return respuesta;
  }
  
  async getFotoImages(){
    console.log(this.products);
    console.log("ACCESO")
    for(let i=0;i<this.products.length;i++){
      
      let cad=await this.addImage(this.products[i].idProducto)
      let arrCad:string[]=cad.split("/");
      this.products[i].image=`http://localhost:8080/products/image/${arrCad[0]}/${arrCad[1]}`
      
      console.log("la cadena es: "+this.products[i].image);
    }
    console.log(this.products);
  }
  async addImage(idProducto:number){
    let cadena;
    await this.homeProductService.getFirstImageByProductId(idProducto).toPromise().then((response) => {
      console.log("LA RESPUESTA ES: ");
        console.log(response.foto);
        cadena=response.foto
    }).catch(e => console.error(e));
    
    return cadena;
  }
}
