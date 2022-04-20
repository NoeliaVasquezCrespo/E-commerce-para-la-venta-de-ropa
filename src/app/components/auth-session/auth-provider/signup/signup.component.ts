import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { admin } from '../../../../models/Admin'
import axios from 'axios';
import Swal from'sweetalert2';

@Component({
  selector: 'll-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide = true;
  hideconfirm = true;
  constructor() { }

  public newAdminForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    correoElectronico: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    empresaId: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
  }

  addNewAdmin(data: admin){
    if(this.newAdminForm.valid){
    var api = 'http://localhost:8080/v2/administrators';
    data.status=1;
    data.tipoAdministradorId=2;
    console.log('Nuevo Proveedor: ', data);
    if(this.newAdminForm.value.password ==  this.newAdminForm.value.confirmpassword) {
      this.successNotification('Se registró al proveedor correctamente');
   
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
    axios.post(api,data).then(function (result){
      console.log(result);
      this.successNotification();

      },error=>{
        this.wrongNotification('Usuario inexistente');
      });
    } else {
      this.wrongNotification('Las contraseñas no coinciden, intente de nuevo');  
    }
    }else{
      this.wrongNotification('Complete los espacios vacíos')
    }
  
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
        window.location.href="http://localhost:4200/admindashboard"
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