import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { product } from '../../../../models/Product';
import axios from 'axios';
import { AddofferService } from 'src/app/service/addoffer.service';

import { ProductListService } from 'src/app/service/product-list.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from'sweetalert2';
import { Offer } from 'src/app/models/Offer';

@Component({
  selector: 'app-addoffers',
  templateUrl: './addoffers.component.html',
  styleUrls: ['./addoffers.component.scss']
})
export class AddoffersComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  errorMsg = '';
  newOfferId:number=0;
  id:number=0;
  newOfferForm:FormGroup;

  constructor(private addofferService:AddofferService,private activatedRoute: ActivatedRoute, private router: Router,  private fb:FormBuilder,) { 
      this.newOfferForm = this.fb.group({
        fechaInicio: new FormControl('', Validators.required),
        fechaFin : new FormControl('', Validators.required),
        montoDescuento : new FormControl('', Validators.required)
      })
  }

 

  ngOnInit(): void {
   
  }
  

  async addNewOffer(data: Offer){
    if(this.newOfferForm.valid){
      const id = this.activatedRoute.snapshot.params.id;
      let newOffer;
      console.log(this.newOfferForm.value);
      await this.addofferService.newOffer(data).toPromise().then(async (response) => {
        newOffer=response;
      }).catch(e => console.error(e));
      console.log(newOffer)
      await this.addofferService.newOfferProduct(id,newOffer.id).toPromise().then(async (response) => {
        newOffer=response;
        this.successNotificationLogin();
      }).catch(e => console.error(e),);
    }  
    else{
      this.wrongNotificationLogin('Complete los espacios vacíos')
    }
  }



  wrongNotificationLogin(mensaje:string){
    Swal.fire({
      icon: 'error',
      title: 'No se pudo registrar oferta',
      text: mensaje,
    })
  }
  successNotificationLogin(){
    Swal.fire({
      title: 'OFERTA EXITOSA',
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
