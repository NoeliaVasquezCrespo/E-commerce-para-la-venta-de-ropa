import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'src/app/service/apiservice.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

 

  errormsg: any;
  successmsg:any;
  getparamid:any;
  selected!: any;
  collection : any;

    

  ngOnInit(): void {
    
      
        
        this.userForm.patchValue({
          first_name:"first_name",
          last_name:"last_name",
          email:"email",
          
        });
     
    
  }

  userForm = new FormGroup ({
    'first_name': new FormControl('',Validators.required),
    'last_name': new FormControl('',Validators.required),
    'email':new FormControl('',Validators.required), 
  });

  //create nw user
  addUser(){
    if(this.userForm.valid){
      console.log(this.userForm.value);
      
      this.successNotificationRegister();
    }
    else {
      this.wrongNotificationRegister();
      return;
    }
     

  }


successNotificationRegister(){
  Swal.fire({
    title: 'Registro Correcto',
    text: 'El registro se realizó correctamente',
    icon: 'success',
    showCancelButton: false,
    confirmButtonText: 'Ok',
  }).then((result) => {
    if (result.value) {
      window.location.href="login"
    }
  })
} 

wrongNotificationRegister(){
  Swal.fire({
    icon: 'error',
    title: 'Error en el registro',
    text: 'Debe completar los espacios vacíos',
  })
}
}
function res(res: any, arg1: string) {
  throw new Error('Function not implemented.');
}

