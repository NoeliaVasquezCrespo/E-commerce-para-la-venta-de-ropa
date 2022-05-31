import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { Producto } from '../../../models/Producto';
import axios from 'axios';
import { AddproductService } from 'src/app/service/addproduct.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import Swal from'sweetalert2';
import {Size} from '../../../models/Size';
import {Color} from '../../../models/Color';
import {ProductListService} from '../../../service/product-list.service';
import {ProductCharacteristic} from '../../../models/ProductCharacteristic';
import {ProductService} from '../../../service/product.service';
import {ProductDetailsService} from '../../../service/productdetails.service';
import {HomeProductService} from '../../../service/home-product.service';
import { product } from '../../../models/Product';
@Component({
  selector: 'll-edit-product',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditProductComponent implements OnInit {
  selectedFiles?: FileList;
  producto: Producto;
  productoCaracteristicas: ProductCharacteristic;
  productCharacteristic:ProductCharacteristic;
  currentFile?: File;
  message = '';
  errorMsg = '';
  newProductoId:number=0;
  datosProducto:FormGroup;
  datosCaracteriticas:FormGroup;
  datosFoto: FormGroup;
  idProduct: number;
  listTallas:Size[]=[];
  listColores:Color[];

  constructor(private addProductService:AddproductService,private router: Router,private activatedRoute: ActivatedRoute,
  private productListService:ProductListService,private productService:ProductService,private productDetailsService:ProductDetailsService,
  private homeProductService:HomeProductService, private fb:FormBuilder,) {
    this.datosProducto=this.fb.group({
      codigoProducto: new FormControl('', Validators.required),
      nombreProducto: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required)
    })
    this.datosCaracteriticas=this.fb.group({
      colorId: new FormControl('', Validators.required),
      tallaId: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required)
    })
  }

  public newProductForm = new FormGroup({
    codigoProducto: new FormControl('', Validators.required),
    nombreProducto : new FormControl('', Validators.required),
    descripcion : new FormControl('', Validators.required),
    stock : new FormControl('', Validators.required),
    precio : new FormControl('', Validators.required),
    administradorId : new FormControl(0, Validators.required),
    color:new FormControl(0, Validators.required),
    talla:new FormControl(0, Validators.required),
  });

  ngOnInit(): void {
    function setTwoNumberDecimal(event) {
      this.value = parseFloat(this.value).toFixed(2);
    }
    this.idProduct= this.activatedRoute.snapshot.params.id;
    this.productService.getProduct(this.idProduct).subscribe(
      resp => {
        this.producto = resp;
        console.log("LOS DATOS DEL PRODUCTO SON");
        console.log(this.producto);
        this.datosProducto.setValue({
          codigoProducto: this.producto.codigoProducto,
          nombreProducto: this.producto.nombreProducto,
          descripcion: this.producto.descripcion,
          precio: this.producto.precio
        });
      }, error => {
        console.log("error");
   });
   this.productDetailsService.getProductDetailsByIdProduct(this.idProduct).subscribe(
    resp => {
      this.productoCaracteristicas = resp;
      console.log("Los detalles del producto son");
      console.log(this.productoCaracteristicas);
      this.datosCaracteriticas.setValue({
        colorId: this.productoCaracteristicas.colorId,
        tallaId: this.productoCaracteristicas.tallaId,
        stock: this.productoCaracteristicas.stock
      })
    }, error => {
      console.log("error");
 });

  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  async addNewCharacteristicProduct(productCharacteristic:ProductCharacteristic){
    let respuesta;
    await this.homeProductService.postProductCharacteristic(productCharacteristic).toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));
    return respuesta;
  }


  async editProduct(){
    let newProducto:Producto={
      codigoProducto: this.datosProducto.value.codigoProducto,
      nombreProducto: this.datosProducto.value.nombreProducto,
      administradorId: this.producto.administradorId,
      descripcion: this.datosProducto.value.descripcion,
      precio: this.datosProducto.value.precio,
      status: 1,
    }
    let newCaracteristicas:ProductCharacteristic={
      colorId: this.datosCaracteriticas.value.colorId,
      tallaId: this.datosCaracteriticas.value.tallaId,
      productId:this.producto.id,
      stock: this.datosCaracteriticas.value.stock,
      status: 1
    }

    await this.confirmationUserUpdate(newProducto,newCaracteristicas);
  }
  async confirmationUserUpdate(producto: Producto,caracteristicas:ProductCharacteristic){
    Swal.fire({
      title: 'Confirmar Actualizacion',
      text: '¿Está seguro de modificar la informacion del producto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.value) {
        await this.updateProduct(producto);
        console.log(caracteristicas);
        await this.updateCaracteristicas(caracteristicas);
        this.successUserNotificationLogin();
      }
    })
  }

  async updateProduct(producto: Producto){
    var api = 'http://localhost:8080/v2/products/'+this.producto.id;
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
    await axios.put(api,producto).then(function (result){
      console.log(result);
    });
  }
  async updateCaracteristicas(caracteristicas: ProductCharacteristic){
    var api = 'http://localhost:8080/v2/productDescriptions/'+this.productoCaracteristicas.id;
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
    await axios.put(api,caracteristicas).then(function (result){
      console.log(result);
    });
  }
  successUserNotificationLogin(){
    Swal.fire({
      title: 'Exito',
      text: 'Productto actualizado correctamente',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    }).then(async (result) => {
      if (result.value) {
        await this.router.navigateByUrl('/providerdashboard/saved-items');
      }
    })
  }

  async upload(id:number): Promise<void> {
    this.errorMsg = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        console.log("ARCHIVO");
        console.log(this.currentFile);
        await this.addProductService.uploadImageProduct(this.currentFile,id).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              console.log(Math.round(100 * event.loaded / event.total));

            } else if (event instanceof HttpResponse) {
              this.message = event.body.responseMessage;
            }
          },
          (err: any) => {
            console.log(err);

            if (err.error && err.error.responseMessage) {
              this.errorMsg = err.error.responseMessage;
            } else {
              this.errorMsg = 'Error occurred while uploading a file!';
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
    this.router.navigateByUrl('/providerdashboard');
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
      title: 'REGISTRO EXITOSO',
      text: 'La operacion se ha realizado completamente',
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
