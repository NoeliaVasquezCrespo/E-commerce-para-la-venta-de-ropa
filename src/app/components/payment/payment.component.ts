import { Component, OnInit, ViewChild  } from '@angular/core';
import { user } from 'src/app/models/User';
import { Address } from 'src/app/models/Address';
import {Router} from '@angular/router';
import axios from 'axios';
import { AuthService } from 'src/app/service/auth.service';
import { AddressService } from 'src/app/service/address.service';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import Swal from'sweetalert2';

import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  advanceSearchExpanded: boolean = false;
  usuario:user;
  direccionAntigua:Address;
  ciudadId:number;
  datosUsuario:FormGroup;
  datosDireccion:FormGroup;
  direccionA: FormGroup;
  stripeTest: FormGroup;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };
  constructor(private authService:AuthService,private addressService:AddressService,private fb:FormBuilder,
    private stripeService: StripeService ,private router: Router,) {
    this.datosUsuario=this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correoElectronico: new FormControl('', Validators.required),
      edad: new FormControl('', Validators.required)
    })
    this.datosDireccion=this.fb.group({
      nombreDireccion: new FormControl('', Validators.required),
      ciudadId: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      codigoPostal: new FormControl('', Validators.required)
    })
    this.direccionA=this.fb.group({
      direccionA: new FormControl('', Validators.required),
    })
   }

  async ngOnInit():  Promise<void> {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    let id:number=parseInt(localStorage.getItem('clientId'));
    let token:string = localStorage.getItem('tokenCli');
    
    this.authService.verificarSesionCliente(id, token).subscribe(
       resp => {
         this.usuario = resp;
         console.log("LOS DATOS DEL USUARIO SON");
         console.log(this.usuario);
         this.ciudadId = this.usuario.direccionId;
         this.obtenerDireccion(this.ciudadId);
         this.datosUsuario.setValue({
           nombre: this.usuario.nombre,
           apellido: this.usuario.apellido,
           correoElectronico: this.usuario.correoElectronico,
           edad: this.usuario.edad
         });
       }, error => {
         console.log("error");
    });
  }

  obtenerDireccion(id:number){
    this.addressService.getAddressById(id).subscribe(
      resp => {
        this.direccionAntigua = resp;
        console.log("LOS DATOS DE LA DIRECCION SON");
        console.log(this.direccionAntigua);
        this.datosDireccion.setValue({
          nombreDireccion: this.direccionAntigua.nombreDireccion,
          ciudadId: this.direccionAntigua.ciudadId,
          telefono: this.direccionAntigua.telefono,
          codigoPostal: this.direccionAntigua.codigoPostal
        });
        this.direccionA.setValue({
          direccionA: this.direccionAntigua.nombreDireccion
        });
      }, error => {
        console.log("error");
     });
  }
  createToken(): void {
    const name = this.usuario.nombre +" "+this.usuario.apellido;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Token
          console.log(result.token.id);
          console.log(result.token);
        } else if (result.error) {
          this.wrongNotification(result.error.message);
          console.log(result.error.message);
        }
      });
  }
  wrongNotification(mensaje:string){
    Swal.fire({
      icon: 'error',
      title: 'Error en el registro',
      text: mensaje,
    })
  }

  async editAddress(){
    console.log(this.datosDireccion.value);
    let newAddress:Address={
      nombreDireccion: this.datosDireccion.value.nombreDireccion,
      codigoPostal: this.datosDireccion.value.codigoPostal,
      telefono: this.datosDireccion.value.telefono,
      ciudadId: this.datosDireccion.value.ciudadId,
      status: 1
    }
    await this.confirmationUpdate(newAddress);

  }

  async confirmationUpdate(address: Address){
    Swal.fire({
      title: 'Confirmar Productos',
      text: '¿Está seguro de modificar la dirección?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.value) {
        await this.updateAddress(address);
        this.successNotificationLogin();
      }
    })
  }

  async updateAddress(address: Address){
    var api = 'http://localhost:8080/v2/addresses/'+this.direccionAntigua.id;
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('tokenCli');
    await axios.put(api,address).then(function (result){
      console.log(result);
    });
  }

  successNotificationLogin(){
    Swal.fire({
      title: 'Exito',
      text: 'Direccion actualizada correctamente',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    }).then(async (result) => {
      if (result.value) {
        location.reload(); 
      }
    })
  }

}
