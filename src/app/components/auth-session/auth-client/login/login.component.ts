import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { AuthRequest } from 'src/app/models/AuthRequest';
import { AuthService } from 'src/app/service/auth.service';
import Swal from'sweetalert2';

@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  hideconfirm = true;
  private auth: AuthRequest = {
    correo: '',
    password: ''
  };

  userForm: FormGroup;

  errormsg: any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
  }

  
  constructor(private authService:AuthService,
    private fb:FormBuilder,
    private router: Router,){
    this.userForm = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });

  }



  
  login(){
   
    if(this.userForm.valid){
      console.log("VALIDANDO DATOS");
      this.auth= {
        correo: this.userForm.value.correo,
        password: this.userForm.value.password,   
      }
        this.authService.loginuser(this.auth).subscribe(resp => {
          console.log(resp);
          if(resp.jwttoken!=null){
            localStorage.setItem('tokenCli',resp.jwttoken);
            localStorage.setItem('clientId',resp.userId.toString())
            this.successNotificationLogin();
          }
        },error=>{
          this.wrongNotificationLogin('Usuario inexistente');
        });
    }
    else{
      this.wrongNotificationLogin('Complete los espacios vacíos')
    }
  }

  
  successNotificationLogin(){
    Swal.fire({
      title: 'BIENVENIDO!',
      text: 'Inicio de sesión correcto',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    }).then(async (result) => {
      if (result.value) {
        console.log('home client')
        await this.router.navigateByUrl('/');
        //window.location.href="http://localhost:4200"
      }
    })
  } 

    
  wrongNotificationLogin(mensaje:string){
    Swal.fire({
      icon: 'error',
      title: 'Error al iniciar sesión',
      text: mensaje,
    })
  }
}

