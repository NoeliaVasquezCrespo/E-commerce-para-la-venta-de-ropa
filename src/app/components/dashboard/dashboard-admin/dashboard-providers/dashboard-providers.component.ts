import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminlistService } from 'src/app/service/adminlist.service';
import { admin } from 'src/app/models/Admin';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard-providers',
  templateUrl: './dashboard-providers.component.html',
  styleUrls: ['./dashboard-providers.component.scss']
})
export class DashboardProvidersComponent implements OnInit {
  admins:admin[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'correo', 'edad'];
  dataSource = new MatTableDataSource();
  cad:string;
  router: any;

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private _liveAnnouncer: LiveAnnouncer, private adminlistService:AdminlistService) {}

  async ngOnInit():Promise<void>{ 
    this.admins = await this.getAdminData();
    this.dataSource.data = this.admins;
    
  }

  async getAdminData(){
    let respuesta;
    console.log("PRIMER METODO");
    await this.adminlistService. getListProvider().toPromise().then((response) => {
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

  ngAfterViewInit(){
    this.dataSource.paginator= this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}