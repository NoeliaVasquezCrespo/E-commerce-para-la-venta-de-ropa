import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { user } from '../../../../models/User'
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

  public newUserForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    correoElectronico: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
    direccionId: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
  }

  addNewAdmin(data: user){
    if(this.newUserForm.valid){
    var api = 'http://localhost:8080/users';
    data.status=1;
    console.log('Nuevo Usuario: ', data);
    if(this.newUserForm.value.password ==  this.newUserForm.value.confirmpassword) {
      this.successNotification('Se registró al usuario correctamente');
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
