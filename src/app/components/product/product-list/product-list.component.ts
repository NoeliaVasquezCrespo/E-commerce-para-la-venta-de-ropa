import {Component, OnInit, ViewChild} from '@angular/core';
import axios from 'axios';
import { ProductListService } from 'src/app/service/product-list.service';
import { Size } from 'src/app/models/Size';
import { Color } from 'src/app/models/Color';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { product } from 'src/app/models/Product';
import { ProductDetails } from 'src/app/models/ProductDetails';
import { HomeProductService } from 'src/app/service/home-product.service';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'll-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  isLoaded: boolean;
  advanceSearchExpanded: boolean = false;
  products:ProductDetails[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<ProductDetails>;
  obsProducts!: Observable<any>;
  listTallas:Size[]=[{id:0, nombreTalla:"TALLA"}];
  listColores:Color[]=[{id:0, descripcion:"COLOR"}];
  userForm:FormGroup;
  constructor(private productListService:ProductListService,
    private fb:FormBuilder,
    private homeProductService:HomeProductService) {
    }

  async ngOnInit(): Promise<void> {
     setTimeout(() => {
       //this.products = productsDB.Product;
        this.getAllProductsData();
        this.isLoaded = true
      }, 1000)

      this.userForm = this.fb.group({
        pruductName: ['', Validators.required],
        talla: new FormControl(this.listTallas[0]),
        color: new FormControl(this.listColores[0]),
      });
    await this.getSizesData();
    await this.getColoursData();
    this.products = await this.getAllProductsDataDetails();
    await this.getFotoImages();
    this.dataSource= new MatTableDataSource<ProductDetails>(this.products)
    this.dataSource.paginator = this.paginator;
    this.obsProducts = this.dataSource.connect();

  }

  getAllProductsData(){
    var api = 'http://localhost:8080/v2/products';
    axios.get(api).then(function (result){
      console.log(result);
    })
  }
  getSizesData(){
    this.productListService.getListTallas().toPromise().then((response) => {
      console.log("LA RESPUESTA ES: ");
      console.log(response);
      this.listTallas=response;
    }).catch(e => console.error(e));

    console.log(this.listTallas);
  }
  getColoursData(){
    this.productListService.getListColours().toPromise().then((response) => {
      console.log("LA RESPUESTA ES: ");
      console.log(response);
      this.listColores=response;
    }).catch(e => console.error(e));

    console.log(this.listTallas);
  }
  filtro():void{

    console.log(this.userForm.value);
  }
  async getAllProductsDataDetails(){
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
      this.products[i].image=`http://localhost:8080/v2/products/image/${arrCad[0]}/${arrCad[1]}`

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

  async aplicarFiltro() {
    if(this.userForm.valid){
      this.products=[]
      this.products = await this.getProductsDataDetailsByName();
      await this.getFotoImages();
      this.dataSource= new MatTableDataSource<ProductDetails>(this.products)
      this.dataSource.paginator = this.paginator;
      this.obsProducts = this.dataSource.connect();
    }
  }
  async getProductsDataDetailsByName(){
    let respuesta;
    console.log("PRIMER METODO");
    await this.homeProductService.getProductDetailsByName(this.userForm.value.pruductName).toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));

    return respuesta;
  }

  async changeInput() {
    if(this.userForm.value.pruductName.length==0){
      this.products=[]
      this.products = await this.getAllProductsDataDetails();
      await this.getFotoImages();
      this.dataSource= new MatTableDataSource<ProductDetails>(this.products)
      this.dataSource.paginator = this.paginator;
      this.obsProducts = this.dataSource.connect();
    }

  }
}
