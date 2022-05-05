import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/User';
import axios from 'axios';
import { AuthService } from 'src/app/service/auth.service';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  advanceSearchExpanded: boolean = false;
  usuario:user;
  datosUsuario:FormGroup;
  datosDireccion:FormGroup;
  constructor(private authService:AuthService,private fb:FormBuilder,) {
    this.datosUsuario=this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correoElectronico: new FormControl('', Validators.required),
      edad: new FormControl('', Validators.required)
    })
   }

   async ngOnInit():  Promise<void> {
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



}
