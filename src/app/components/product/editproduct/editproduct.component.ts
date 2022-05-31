import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { product } from '../../../models/Product';
import { ProductDetails } from '../../../models/ProductDetails';
import axios from 'axios';
import { AddproductService } from 'src/app/service/addproduct.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import Swal from'sweetalert2';
import {Size} from '../../../models/Size';
import {Color} from '../../../models/Color';
import {ProductListService} from '../../../service/product-list.service';
import {ProductCharacteristic} from '../../../models/ProductCharacteristic';
import {HomeProductService} from '../../../service/home-product.service';

@Component({
  selector: 'll-edit-product',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditProductComponent implements OnInit {
  selectedFiles?: FileList;
  producto: product;
  productoDetails: ProductDetails;
  productCharacteristic:ProductCharacteristic
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
  private productListService:ProductListService,private homeProductService:HomeProductService, private fb:FormBuilder,) {
    this.datosProducto=this.fb.group({
      codigoProducto: new FormControl('', Validators.required),
      nombreProducto: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required)
    })
    this.datosCaracteriticas=this.fb.group({
      color: new FormControl('', Validators.required),
      talla: new FormControl('', Validators.required),
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

  async ngOnInit(): Promise<void> {
    function setTwoNumberDecimal(event) {
      this.value = parseFloat(this.value).toFixed(2);
    }
    this.listColores=await this.getColoursData();
    this.listTallas=await this.getSizesData();
    this.idProduct= this.activatedRoute.snapshot.params.id;
    this.homeProductService.getProductByProductId(this.idProduct).subscribe(
      resp => {
        this.productoDetails = resp;
        console.log("LOS DATOS DEL USUARIO SON");
        console.log(this.productoDetails);
      }, error => {
        console.log("error");
   });
    console.log(this.listColores);
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


  async addNewProduct(data: product){
    var id = localStorage.getItem('userId');
    console.log(this.newProductForm.value);
    this.newProductForm.value.administradorId = id;
    if(this.newProductForm.valid){
      this.producto={
        administradorId: parseInt(id),
        codigoProducto: this.newProductForm.value.codigoProducto,
        colorId: this.newProductForm.value.color,
        descripcion: this.newProductForm.value.descripcion,
        nombreProducto: this.newProductForm.value.nombreProducto,
        precio: this.newProductForm.value.precio,
        status: 1,
        stock: this.newProductForm.value.stock,
        tallaId: this.newProductForm.value.talla
      }

      let self = this
      console.log("EJECUTANDO METODO PARA AGREGAR PRODUCTO");
      var api = 'http://localhost:8080/v2/products';

      console.log('New Product : ', data);
      axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
      await axios.post(api,this.producto).then(function (result){
      console.log(result.data);
      console.log(result.data.id);
      let value:number=result.data.id || 0;
      self.newProductoId=value;
      });
      this.productCharacteristic={
        colorId: this.newProductForm.value.color,
        productId: this.newProductoId,
        stock: this.newProductForm.value.color,
        tallaId: this.newProductForm.value.talla,
        status:1}
      let prodcuctChar:ProductCharacteristic= await this.addNewCharacteristicProduct(this.productCharacteristic);
      await this.upload(prodcuctChar.id);

      this.successNotificationLogin();
    }else{

      this.wrongNotificationLogin('Complete los espacios vacíos')
    }


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
