import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { AuthRequest } from 'src/app/models/AuthRequest';
import { ApiserviceService } from 'src/app/service/apiservice.service';
import { AuthService } from 'src/app/service/auth.service';
import Swal from'sweetalert2';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  private auth: AuthRequest = {
    username: '',
    password: '',
    tipoUsuarioId:0
  };

  userForm: FormGroup;

  errormsg: any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
   
    
        
    
  }
  constructor(private authService:AuthService,
    private fb:FormBuilder,){
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  

  //create nw user
  userAuth(){
    if(this.userForm.valid){
      
        this.successNotificationLogin()
      
    } else {
      this.wrongNotificationLogin()
    }
    

  }

  login(){
    console.log("VALIDANDO DATOS");
    this.auth= {
      username: this.userForm.value.username,
      password: this.userForm.value.password,
      tipoUsuarioId:1
    }
    this.authService.login(this.auth).subscribe(resp => {
      console.log(resp);
    });

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
