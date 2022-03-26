import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { ApiserviceService } from 'src/app/service/apiservice.service';
import Swal from'sweetalert2';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  

  errormsg: any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
   
    
        
    this.userForm.patchValue({
    
      
    });
    
  }

  userForm = new FormGroup ({
    'email': new FormControl('',Validators.required)
  });

  //create nw user
  userAuth(){
    if(this.userForm.valid){
      
        this.successNotificationLogin()
      
    } else {
      this.wrongNotificationLogin()
    }
    

  }


  successNotificationLogin(){
    Swal.fire({
      title: 'BIENVENIDO!',
      text: 'Inicio de sesión correcto',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.value) {
        window.location.href="http://localhost:4200"
      }
    })
  } 
    
  wrongNotificationLogin(){
    Swal.fire({
      icon: 'error',
      title: 'Error al iniciar sesión',
      text: 'Complete los espacios vacíos',
    })
  }


}
