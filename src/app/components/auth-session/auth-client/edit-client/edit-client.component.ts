import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { user } from '../../../../models/User';
import { Address } from 'src/app/models/Address';
import { AuthService } from 'src/app/service/auth.service';
import { AddressService } from 'src/app/service/address.service';
import axios from 'axios';
import Swal from'sweetalert2';

@Component({
  selector: 'll-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  hide = true;
  advanceSearchExpanded: boolean = false;
  hideconfirm = true;
  usuario:user;
  direccionAntigua:Address;
  ciudadId:number;
  datosUsuario:FormGroup;
  datosDireccion:FormGroup;
  direccionA: FormGroup;

  constructor(private fb:FormBuilder, private authService:AuthService,
    private addressService:AddressService) {
    this.datosUsuario=this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correoElectronico: new FormControl('', Validators.required),
      edad: new FormControl('', Validators.required),
      password: new FormControl('',Validators.required),
      confirmpassword: new FormControl('', Validators.required)
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

  ngOnInit(): void {
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
          edad: this.usuario.edad,
          password: this.usuario.password,
          confirmpassword: this.usuario.password
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

  async editAdmin(){
    if(this.datosUsuario.value.password==this.datosUsuario.value.confirmpassword){
      let newUser:user={
        nombre: this.datosUsuario.value.nombre,
        apellido: this.datosUsuario.value.apellido,
        edad: this.datosUsuario.value.edad,
        correoElectronico: this.datosUsuario.value.correoElectronico,
        password: this.datosUsuario.value.password,
        direccionId: this.direccionAntigua.id,
        status: 1,
      }
      await this.confirmationUserUpdate(newUser);
    }else {
      this.wrongNotification('Las contraseñas no coinciden, intente de nuevo');  
    }
  }

  async confirmationUserUpdate(user: user){
    Swal.fire({
      title: 'Confirmar Actualizacion',
      text: '¿Está seguro de modificar la informacion del cliente?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.value) {
        await this.updateUser(user);
        this.successUserNotificationLogin();
      }
    })
  }

  async updateUser(user: user){
    var api = 'http://localhost:8080/v2/users/'+this.usuario.id;
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('tokenCli');
    await axios.put(api,user).then(function (result){
      console.log(result);
    });
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

  successUserNotificationLogin(){
    Swal.fire({
      title: 'Exito',
      text: 'Cliente actualizado correctamente',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    }).then(async (result) => {
      if (result.value) {
        window.location.href="http://localhost:4200/";
      }
    })
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

  async updateAddress(address: Address){
    var api = 'http://localhost:8080/v2/addresses/'+this.direccionAntigua.id;
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('tokenCli');
    await axios.put(api,address).then(function (result){
      console.log(result);
    });
  }

  successNotification(mensaje:string){
    Swal.fire({
      title: 'CORRECTO',
      text: mensaje,
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.value) {
        console.log('admin dashboard')
        window.location.href="http://localhost:4200/"
      }
    })
  } 
    
  wrongNotification(mensaje:string){
    Swal.fire({
      icon: 'error',
      title: 'Error en el registro',
      text: mensaje,
    })
  }

}
