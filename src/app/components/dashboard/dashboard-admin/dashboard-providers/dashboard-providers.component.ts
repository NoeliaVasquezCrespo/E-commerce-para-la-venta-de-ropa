import { Component, OnInit } from '@angular/core';
import { AdminlistService } from 'src/app/service/adminlist.service';
import { admin } from 'src/app/models/Admin';
@Component({
  selector: 'app-dashboard-providers',
  templateUrl: './dashboard-providers.component.html',
  styleUrls: ['./dashboard-providers.component.scss']
})
export class DashboardProvidersComponent implements OnInit {
  admins:admin[] = [];
  cad:string;
  constructor(private adminlistService:AdminlistService) {}

  async ngOnInit():Promise<void>{ 
    this.admins = await this.getAdminData();
    
    
  }

  async getAdminData(){
    let respuesta;
    console.log("PRIMER METODO");
    await this.adminlistService.getListAdmin().toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));

    return respuesta;
  }
}