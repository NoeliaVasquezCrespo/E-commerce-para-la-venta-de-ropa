import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { product } from '../../../../models/Product';
import axios from 'axios';
import { AddproductService } from 'src/app/service/addproduct.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from'sweetalert2';
import {Size} from '../../../../models/Size';
import {Color} from '../../../../models/Color';
import {ProductListService} from '../../../../service/product-list.service';
import {ProductCharacteristic} from '../../../../models/ProductCharacteristic';
import {HomeProductService} from '../../../../service/home-product.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  idParam:number;
  producto:product;
  updateProducto:product;
  message = '';
  errorMsg = '';
  newProductForm:FormGroup;

  listTallas:Size[]=[];
  listColores:Color[];

  constructor(private activatedRoute: ActivatedRoute,
              private addProductService:AddproductService,
              private router: Router,
              private fb:FormBuilder,
              private productListService:ProductListService,
              private homeProductService:HomeProductService) { 
                this.newProductForm = this.fb.group({
                codigoProducto: new FormControl('', Validators.required),
                nombreProducto : new FormControl('', Validators.required),
                descripcion : new FormControl('', Validators.required),
                stock : new FormControl('', Validators.required),
                precio : new FormControl('', Validators.required),
                administradorId : new FormControl(0, Validators.required),
                color:new FormControl(0, Validators.required),
                talla:new FormControl(0, Validators.required),
              });
  }  
  async editProduct(){
    console.log(this.newProductForm.value);
    let newProduct:product={
      codigoProducto: this.producto.codigoProducto,
      nombreProducto: this.producto.nombreProducto,
      descripcion: this.producto.descripcion,
      stock: this.producto.stock,
      precio: this.producto.precio,
      colorId: this.producto.colorId,
      tallaId: this.producto.tallaId,
      administradorId: this.producto.administradorId,
      status: this.producto.status
    }
    await this.updateProduct(newProduct);
  }

  async updateProduct(product:product){
    let respuesta;
    this.productListService.updateProduct(this.idParam,product).toPromise().then(async (response) => {
      respuesta = response;
      console.log("LA RESPUESTA ES:")
      console.log(respuesta)
      console.log("FIN RESPUESTA")
      if(respuesta!=null){
          await this.successNotificationLogin();
      }
    }).catch(e => console.error(e));
    return respuesta;
  
  }

  async ngOnInit(): Promise<void> {
    this.idParam = this.activatedRoute.snapshot.params.id;
    console.log(this.idParam);
    function setTwoNumberDecimal(event) {
      this.value = parseFloat(this.value).toFixed(2);
    }
    this.listColores=await this.getColoursData();
    this.listTallas=await this.getSizesData();
    console.log(this.listColores);

    this.producto = await this.getProductById(this.idParam);
    console.log(this.producto);
    this.newProductForm.patchValue(
      {
      codigoProducto: this.producto.codigoProducto,
      nombreProducto: this.producto.nombreProducto,
      descripcion: this.producto.descripcion,
      stock: this.producto.stock,
      precio: this.producto.precio,
      colorId: this.producto.colorId,
      tallaId: this.producto.tallaId,
      administradorId: this.producto.administradorId,
      status: this.producto.status

       
      });
    console.log(this.newProductForm.value);
  }
 
  async getProductById(id:number):Promise<product>{
    let respuesta:product;
    console.log("PRIMER METODO");
    //let idProvider:number = parseInt(localStorage.getItem('userId'));
    await this.productListService.getProductById(id).toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));
    return respuesta;
  }

  async addNewCharacteristicProduct(productCharacteristic:ProductCharacteristic){
    let respuesta;
    await this.homeProductService.postProductCharacteristic(productCharacteristic).toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));
    return respuesta;
  }


  

  
  wrongNotificationLogin(mensaje:string){
    Swal.fire({
      icon: 'error',
      title: 'No se pudo registrar producto',
      text: mensaje,
    })
  }
  successNotificationLogin(){
    Swal.fire({
      title: 'Actualización Exitosa',
      text: 'Información del producto actualizado correctamente',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    }).then(async (result) => {
      if (result.value) {
        await this.router.navigateByUrl('/providerdashboard/saved-items');
        //window.location.href="http://localhost:4200"
      }
    })
  }
  async getSizesData(){
    let respuesta;
    await this.productListService.getListTallas().toPromise().then((response) => {
      console.log("LA RESPUESTA ES: ");
      console.log(response);
      respuesta=response;
    }).catch(e => console.error(e));
    return respuesta;
  }
  async getColoursData(){
    let respuesta;
    await this.productListService.getListColours().toPromise().then((response) => {
      console.log("LA RESPUESTA ES: ");
      console.log(response);
      respuesta=response;
    }).catch(e => console.error(e));
    return respuesta;
  }

}
