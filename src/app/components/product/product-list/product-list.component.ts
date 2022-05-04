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

import { CartService } from 'src/app/service/cart.service';

import Swal from'sweetalert2';
import {Router} from '@angular/router';
import {CategoryService} from '../../../service/category.service';
import {Category} from '../../../models/Category';
interface Items{
  id:number,
  value:string,
}
@Component({
  selector: 'll-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  isLoaded: boolean;
  advanceSearchExpanded: boolean = false;
  advanceFilterExpanded: boolean = false;
  hintColor = '#ff0000';
  validHint: boolean=false;
  products:ProductDetails[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<ProductDetails>;
  obsProducts!: Observable<any>;
  listTallas:Size[]=[{id:0, nombreTalla:"TALLA"}];
  listColores:Color[]=[{id:0, descripcion:"COLOR"}];
  listCategories:Category[]=[{id: 0,categoria: "CATEGORIA"}];

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  userForm:FormGroup;
  filterForm:FormGroup;
  public productList : any ;
  public filterCategory : any;
  constructor(private productListService:ProductListService,
    private fb:FormBuilder,
    private homeProductService:HomeProductService,
    private cartService : CartService,
    private router: Router,
    private categoryService:CategoryService) {

    }
  async ngOnInit(): Promise<void> {
     setTimeout(() => {
       //this.products = productsDB.Product;
        this.getAllProductsData();
        this.isLoaded = true
      }, 1000)

      this.userForm = this.fb.group({
        pruductName: ['', Validators.required],
        productMarca: [''],

      });
     this.filterForm = this.fb.group({
       categoria: [0, Validators.required],
     });
    await this.getSizesData();
    this.listCategories = await this.getAllCategories();
    console.log("LAS CATEGORIAS SON: ");
    console.log(this.listCategories);
    await this.getColoursData();
    this.products = await this.getAllProductsDataDetails();
    console.log(this.products);
    await this.getFotoImages();
    this.dataSource= new MatTableDataSource<ProductDetails>(this.products)
    this.dataSource.paginator = this.paginator;
    this.obsProducts = this.dataSource.connect();

  }
  async getAllCategories(){
    let respuesta: Category[] = [{id: 0, categoria: "--SELECCIONE UN CATEGORIA"}];
    await this.categoryService.getListTallas().toPromise().then((response) => {
      for(let i=0;i<response.length;i++){
        respuesta.push(response[i]);
      }
    }).catch(e => console.error(e));
    return respuesta;
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
      if(cad!=''){
        let arrCad:string[]=cad.split("/");
        this.products[i].image=`http://localhost:8080/v2/products/image/${arrCad[0]}/${arrCad[1]}`
        console.log("la cadena es: "+this.products[i].image);
      }else{
        this.products[i].image=`https://cdn.pixabay.com/photo/2016/09/28/02/14/user-1699635_640.png`
      }
    }
    console.log(this.products);
  }
  async addImage(idProducto:number){
    let cadena;
    await this.homeProductService.getFirstImageByProductId(idProducto).toPromise().then((response) => {
      console.log("LA RESPUESTA ES: ");
      console.log(response.foto);
      cadena=response.foto
    }).catch(e =>{
      console.error(e);
      cadena='';
    } );

    return cadena;
  }

  async aplicarBusqueda() {
    console.log(this.userForm.value);
    console.log("SE BUSCARAN DATOS EN BASE A LOS FILTROS");
    if(this.userForm.valid){
      this.products=[]
      this.products = await this.getProductsDataDetailsByName();
      console.log(this.products);
      await this.getFotoImages();
      this.dataSource= new MatTableDataSource<ProductDetails>(this.products)
      this.dataSource.paginator = this.paginator;
      this.obsProducts = this.dataSource.connect();
      if(this.products.length==0){
        this.warningNotification();
      }
    }
  }
  async getProductsDataDetailsByName(){

    console.log(this.userForm.value);
    let respuesta;
    console.log("PRIMER METODO");
    await this.homeProductService.getProductDetailsByNameAndMarca(this.userForm.value.pruductName,this.userForm.value.productMarca).toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));

    return respuesta;
  }

  async changeInput() {
    if(this.userForm.value.pruductName.length==0 && this.userForm.value.productMarca.length==0){
      console.log("RESTAURANDO CONTENIDO");
      this.products=[]
      this.products = await this.getAllProductsDataDetails();
      await this.getFotoImages();
      this.dataSource= new MatTableDataSource<ProductDetails>(this.products)
      this.dataSource.paginator = this.paginator;
      this.obsProducts = this.dataSource.connect();
    }
  }
  warningNotification(){
    Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: 'No se encontraron coincidencias',
    })
  }

  async irADetalleProducto(idProducto:number) {
    console.log("ID PRODUCTO ES");
    console.log(idProducto);
    await this.router.navigateByUrl('/products/'+idProducto);
  }
  async addtocart(product: any){
    console.log("Agregando al carrito");
    await this.cartService.addtoCart(product);
  }

  async aplicarFiltro() {
    console.log(this.filterForm.value);
    if(this.filterForm.value.categoria==0){
      this.validHint=true;
      this.products=[]
      this.products = await this.getAllProductsDataDetails();
      console.log(this.products);
      await this.getFotoImages();
      this.dataSource= new MatTableDataSource<ProductDetails>(this.products)
      this.dataSource.paginator = this.paginator;
      this.obsProducts = this.dataSource.connect();
    }else{
      this.validHint= false;
      this.products=[]
      this.products = await this.getProductsDataDetailsByCategoriaId();
      await this.getFotoImages();
      this.dataSource= new MatTableDataSource<ProductDetails>(this.products)
      this.dataSource.paginator = this.paginator;
      this.obsProducts = this.dataSource.connect();

    }
  }

  async getProductsDataDetailsByCategoriaId(){

    let respuesta;
    console.log("PRIMER METODO");
    await this.homeProductService.getProductDetailsByCategoriaId(this.filterForm.value.categoria).toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));

    return respuesta;
  }
}
