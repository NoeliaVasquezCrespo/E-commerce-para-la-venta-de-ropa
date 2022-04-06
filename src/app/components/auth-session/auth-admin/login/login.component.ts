import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { AuthRequest } from 'src/app/models/AuthRequest';
import { ApiserviceService } from 'src/app/service/apiservice.service';
import { AuthService } from 'src/app/service/auth.service';
import Swal from'sweetalert2';

@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  private auth: AuthRequest = {
    username: '',
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
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }


  //create nw user
  userAuth(){
    if(this.userForm.valid){
      
        this.successNotificationLogin()
      
    } else {
      this.wrongNotificationLogin('Complete los espacios vacíos')
    }
    

  }

  login(){
    if(this.userForm.valid){
      console.log("VALIDANDO DATOS");
      this.auth= {
        username: this.userForm.value.username,
        password: this.userForm.value.password,
      }
      this.authService.login(this.auth).subscribe(resp => {
        console.log(resp);
        if(resp.jwttoken!=null){
          localStorage.setItem('token',resp.jwttoken);
          localStorage.setItem('userId',resp.userId.toString())
          this.successNotificationLogin();
        }
      },error=>{
        this.wrongNotificationLogin('Usuario inexistente');
      });
    }else{
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
    }).then((result) => {
      if (result.value) {
        console.log('admin dashboard')
        this.router.navigateByUrl('/admindashboard');
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
