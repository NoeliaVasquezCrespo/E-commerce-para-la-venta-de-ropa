import { Component, OnInit, ViewChild } from '@angular/core';
import { AdministradorRequest } from 'src/app/models/AdministradorRequest';
import { AuthService } from 'src/app/service/auth.service';
import { AdminlistService } from 'src/app/service/adminlist.service';
import { admin } from 'src/app/models/Admin';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'll-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.scss']
})
export class DashboardIndexComponent implements OnInit {

  orders = [];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'correo', 'edad'];
  administrator:AdministradorRequest;
  admins:admin[] = [];
  cad:string;
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private _liveAnnouncer: LiveAnnouncer, private authService:AuthService,private adminlistService:AdminlistService) {}

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
      this.dataSource.data = this.admins;
  }

  async getAdminData(){
    let respuesta;
    console.log("PRIMER METODO");
    await this.adminlistService.getListAdminSys().toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));

    return respuesta;
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
