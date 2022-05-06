import { Component, OnInit, ViewChild  } from '@angular/core';
import { user } from 'src/app/models/User';
import axios from 'axios';
import { AuthService } from 'src/app/service/auth.service';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
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
  datosUsuario:FormGroup;
  datosDireccion:FormGroup;
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
  constructor(private authService:AuthService,private fb:FormBuilder,
    private stripeService: StripeService) {
    this.datosUsuario=this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correoElectronico: new FormControl('', Validators.required),
      edad: new FormControl('', Validators.required)
    })
   }

   async ngOnInit():  Promise<void> {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    let id:number=parseInt(localStorage.getItem('clientId'));
    let token:string = localStorage.getItem('tokenCli');
    
    await this.authService.verificarSesionCliente(id,token).subscribe(
      resp => {
        this.usuario=resp;
        console.log("LOS DATOS DEL USUARIO SON");
        console.log(this.usuario);
        this.datosUsuario.setValue({
          nombre: this.usuario.nombre,
          apellido: this.usuario.apellido,
          correoElectronico: this.usuario.correoElectronico,
          edad: this.usuario.edad
        });
      },error=>{
        console.log("error");
    });
  }

  createToken(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Token
          console.log(result.token.id);
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
  }


}
