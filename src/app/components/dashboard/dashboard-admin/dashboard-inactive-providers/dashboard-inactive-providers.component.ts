import { Component, OnInit } from '@angular/core';
import { AdminlistService } from 'src/app/service/adminlist.service';
import { admin } from 'src/app/models/Admin';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-inactive-providers',
  templateUrl: './dashboard-inactive-providers.component.html',
  styleUrls: ['./dashboard-inactive-providers.component.scss']
})
export class DashboardInactiveProvidersComponent implements OnInit {
  admins:admin[] = [];
  cad:string;
  router: any;
  constructor(private adminlistService:AdminlistService) {}

  async ngOnInit():Promise<void>{ 
    this.admins = await this.getAdminData();
    
    
  }

  async getAdminData(){
    let respuesta;
    console.log("PRIMER METODO");
    await this.adminlistService. getInactiveListProvider().toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));

    return respuesta;
  }

  onDelete(): void {
    this.successNotificationDelete()
  }


  successNotificationDelete(){
    Swal.fire({
      title: 'Eliminar Proveedor',
      text: '¿Está seguro de eliminar el proveedor?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        console.log('Proveedor eliminado correctamente')
        this.successNotificationDeleteCorrectly()
      }
    })
  } 

  successNotificationDeleteCorrectly(){
    Swal.fire({
      icon: 'success',
      title: 'Proveedor Eliminado correctamente',
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.value) {
        console.log('admin home')
        this.router.navigateByUrl('/adminhome');
      }
    })
  }
}