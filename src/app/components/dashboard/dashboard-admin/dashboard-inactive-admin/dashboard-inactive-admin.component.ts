import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { AdministradorRequest } from 'src/app/models/AdministradorRequest';
import { AuthService } from 'src/app/service/auth.service';
import { AdminlistService } from 'src/app/service/adminlist.service';
import { admin } from 'src/app/models/Admin';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard-inactive-admin',
  templateUrl: './dashboard-inactive-admin.component.html',
  styleUrls: ['./dashboard-inactive-admin.component.scss']
})
export class DashboardInactiveAdminComponent implements OnInit {
  admins:admin[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'correo', 'edad'];
  dataSource = new MatTableDataSource();
  cad:string;
  router: any;
  administrator:AdministradorRequest;
 
  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private _liveAnnouncer: LiveAnnouncer,private authService:AuthService,private adminlistService:AdminlistService) {}

  async ngOnInit(): Promise<void> {
    
    let id:number=parseInt(localStorage.getItem('userId'));
    let token:string = localStorage.getItem('token');
    
    await this.authService.verificarSesion(id,token).subscribe(
      resp => {
        this.administrator=resp;
        console.log("LOS DATOS DEL USUARIO SON");
        console.log(this.administrator);
        
      },error=>{
        console.log("error");
      });
      this.admins = await this.getAdminData();
      this.dataSource.data = this.admins;
  }

  async getAdminData(){
    let respuesta;
    console.log("PRIMER METODO");
    await this.adminlistService.getInactiveListAdminSys().toPromise().then((response) => {
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
