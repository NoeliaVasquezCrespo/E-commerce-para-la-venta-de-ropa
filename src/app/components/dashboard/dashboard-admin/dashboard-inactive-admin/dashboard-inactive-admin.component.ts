import { Component, OnInit } from '@angular/core';
import { AdministradorRequest } from 'src/app/models/AdministradorRequest';
import { AuthService } from 'src/app/service/auth.service';
import { AdminlistService } from 'src/app/service/adminlist.service';
import { admin } from 'src/app/models/Admin';
@Component({
  selector: 'app-dashboard-inactive-admin',
  templateUrl: './dashboard-inactive-admin.component.html',
  styleUrls: ['./dashboard-inactive-admin.component.scss']
})
export class DashboardInactiveAdminComponent implements OnInit {
  orders = [];
  administrator:AdministradorRequest;
  admins:admin[] = [];
  cad:string;
  constructor(private authService:AuthService,private adminlistService:AdminlistService) {}

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
      this.admins = await this.getAdminData();
  }

  async getAdminData(){
    let respuesta;
    console.log("PRIMER METODO");
    await this.adminlistService.getInactiveListAdminSys().toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));

    return respuesta;
  }
  
}
