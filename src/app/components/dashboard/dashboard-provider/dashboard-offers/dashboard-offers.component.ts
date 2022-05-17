import { Component, OnInit, ViewChild } from '@angular/core';
import { AddofferService } from 'src/app/service/addoffer.service';
import { OfferProduct } from 'src/app/models/OfferProduct';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';

import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-offers',
  templateUrl: './dashboard-offers.component.html',
  styleUrls: ['./dashboard-offers.component.scss']
})
export class DashboardOffersComponent implements OnInit {
  offers:OfferProduct[] = [];
  displayedColumns: string[] = ['id', 'oferta_id', 'producto_id', 'opciones'];
  dataSource = new MatTableDataSource();
  cad:string;

  @ViewChild(MatPaginator) paginatorProducts!: MatPaginator;
  

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private _liveAnnouncer: LiveAnnouncer, private offerlistService:AddofferService,
              private router : Router) {}

  async ngOnInit():Promise<void>{
    this.offers = await this.getAdminData();
    this.dataSource.data = this.offers;

  }

  async getAdminData(){
    let respuesta;
    console.log("PRIMER METODO");
    await this.offerlistService. getListProvider().toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));

    return respuesta;
  }

  onDelete(): void {
    this.successNotificationDelete()
  }


  async successNotificationDelete(){
    Swal.fire({
      title: 'Eliminar Proveedor',
      text: '¿Está seguro de eliminar la oferta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.value) {
        console.log('Oferta eliminada correctamente')
       
      }
    })
  }

   

  async deleteProviderNotification(id:number){
    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de eliminar la oferta?',
      showConfirmButton: true,
      showCancelButton:true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then(async(result) => {
      if (result.value) {
        console.log('SE  ELIMINARA OFERTA')
        console.log(`ID DE OFERTA: ${id}`)
        
       //   await this.deleteProviderById(id);
          console.log("SE ELIMINO A LA OFERTA")
         
        
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
 /* async deleteProviderById(id:number){
    this.adminlistService.deleteProvider(id).toPromise().then((response) => {
    }).catch(e => console.error(e));
  }
  */
  

  async irAInterfazEditar(id: number) {
    await this.router.navigateByUrl(`/admindashboard/edit-provider/${id}`);

  }
}
