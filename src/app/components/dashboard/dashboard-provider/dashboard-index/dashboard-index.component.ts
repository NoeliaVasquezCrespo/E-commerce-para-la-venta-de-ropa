import { Component, OnInit } from '@angular/core';
import { AdministradorRequest } from 'src/app/models/AdministradorRequest';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'll-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.scss']
})
export class DashboardIndexComponent implements OnInit {

  administrator:AdministradorRequest;
  constructor(private authService:AuthService) {}
 
    async ngOnInit(): Promise<void> {
    
      let id:number=parseInt(localStorage.getItem('userId'));
      let token:string = localStorage.getItem('token');
      let staus:boolean=false;
      await this.authService.verificarSesion(id,token).subscribe(
        resp => {
          this.administrator=resp;
          console.log("LOS DATOS DEL USUARIO SON");
          console.log(this.administrator);
          
        },error=>{
          console.log("error");
        });
  
    
      }}
