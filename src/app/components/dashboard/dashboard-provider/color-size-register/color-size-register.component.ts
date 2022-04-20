import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { product } from '../../../../models/Product';
import axios from 'axios';
import { AddproductService } from 'src/app/service/addproduct.service';
import { Size } from 'src/app/models/Size';
import { Color } from 'src/app/models/Color';

import { ProductListService } from 'src/app/service/product-list.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from'sweetalert2';


@Component({
  selector: 'app-color-size-register',
  templateUrl: './color-size-register.component.html',
  styleUrls: ['./color-size-register.component.scss']
})
export class ColorSizeRegisterComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  errorMsg = '';
  listTallas:Size[]=[{id:0, nombreTalla:"TALLA"}];
  listColores:Color[]=[{id:0, descripcion:"COLOR"}];
  newProductoId:number=0;
  constructor(private addProductService:AddproductService,private productListService:ProductListService,
    private router: Router) { }

  public newProductForm = new FormGroup({
    talla: new FormControl(this.listTallas[0]),
    color: new FormControl(this.listColores[0]),
    stock : new FormControl('', Validators.required),

  });

  ngOnInit(): void {
    function setTwoNumberDecimal(event) {
      this.value = parseFloat(this.value).toFixed(2);
    }
    this.getSizesData();
    this.getColoursData();
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }


  async addNewProduct(data: product){
    var id = localStorage.getItem('userId');
    console.log(this.newProductForm.value);
    this.newProductForm.value.administradorId = id;

    if(this.newProductForm.valid){
      let self = this
      console.log("EJECUTANDO METODO PARA AGREGAR PRODUCTO");
      var api = 'http://localhost:8080/v2/products';

      data.administradorId=parseInt(id);
      data.status=1;
      console.log('New Product : ', data);
      axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
      await axios.post(api,data).then(function (result){
      console.log(result.data);
      console.log(result.data.id);
      let value:number=result.data.id || 0;
      self.newProductoId=value;

      });
      this.upload();
      this.successNotificationLogin();
    }else{

      this.wrongNotificationLogin('Complete los espacios vacíos')
    }


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

  upload(): void {
    this.errorMsg = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        console.log("ARCHIVO");
        console.log(this.currentFile);
        this.addProductService.uploadImageProduct(this.currentFile,this.newProductoId).subscribe(
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

}
