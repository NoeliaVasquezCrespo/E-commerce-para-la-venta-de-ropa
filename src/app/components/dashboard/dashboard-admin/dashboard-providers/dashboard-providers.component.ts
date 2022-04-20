import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminlistService } from 'src/app/service/adminlist.service';
import { admin } from 'src/app/models/Admin';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';

import Swal from 'sweetalert2';
import {ProductlistService} from '../../../../service/productlist.service';
import {ProductDetails} from '../../../../models/ProductDetails';
import {Router} from '@angular/router';
import {product} from '../../../../models/Product';
@Component({
  selector: 'app-dashboard-providers',
  templateUrl: './dashboard-providers.component.html',
  styleUrls: ['./dashboard-providers.component.scss']
})
export class DashboardProvidersComponent implements OnInit {
  admins:admin[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'correo', 'edad','opciones'];
  displayedColumnsProducts:string[] = ['pruducto', 'marca', 'precio', 'stock'];
  dataSource = new MatTableDataSource();
  cad:string;

  @ViewChild(MatPaginator) paginatorProducts!: MatPaginator;
  dataSourceProducts!: MatTableDataSource<product>;

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private _liveAnnouncer: LiveAnnouncer, private adminlistService:AdminlistService,
              private productlistService:ProductlistService,private router : Router) {}

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


  async successNotificationDelete(){
    Swal.fire({
      title: 'Eliminar Proveedor',
      text: '¿Está seguro de eliminar el proveedor?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.value) {
        console.log('Proveedor eliminado correctamente')
        await this.successNotificationDeleteCorrectly()
      }
    })
  }

  async successNotificationDeleteCorrectly(){
    let self = this
    Swal.fire({
      icon: 'success',
      title: 'Proveedor Eliminado correctamente',
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
    }).then(async (result) => {
      if (result.value) {
        console.log('admin home')
        await self.router.navigateByUrl('/admindashboard');
      }
    })
  }
  htmlTable(data) {

    return [
      `<table class="table-inside">
            <thead class=" border ltLg:responsive">
                <tr>
                    <th style="width: 380px" scope="col">Codigo</th>
                    <th style="width: 280px" scope="col">Nombre</th>
                    <th style="width: 280px" scope="col">Precio</th>
                </tr>
            </thead>
            <tbody>

                ${data.join('')}

            </tbody>
        </table>
        <br>
        <p>Se eliminaran estos productos, ¿Desea continuar?</p>`].join('');
  }
  async warningProductsByProvider(id:number, respuesta: product[]){
    console.log(respuesta);
    let data=[];

    for (let i = 0; i < respuesta.length; i++) {

      data.push(`<tr>
      <td style="width: 100px">${respuesta[i].codigoProducto}</td>
      <td style="width: 100px">${respuesta[i].nombreProducto}</td>
      <td style="width: 100px">${respuesta[i].precio}</td></tr>`)
    }

    console.log(this.htmlTable(data))
    Swal.fire({
      icon: 'warning',
      title: 'Productos encontrados',
      html: this.htmlTable(data),
      showConfirmButton: true,
      showCancelButton:true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then(async(result) => {
      if (result.value) {
        console.log("LA RESPUESTA ES");
        console.log(respuesta);
        for(let i=0;i<respuesta.length;i++){
          await this.deleteProductById(respuesta[i].id);
        }
        await this.deleteProviderById(id);
        console.log("SE ELIMINO AL PROVEEDOR")
        await this.successNotificationDeleteCorrectly();
      }
    });
  }

  async deleteProviderNotification(id:number){
    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de eliminar al proveedor?',
      showConfirmButton: true,
      showCancelButton:true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then(async(result) => {
      if (result.value) {
        console.log('SE  ELIMINARA PROVEEDOR')
        console.log(`ID DE PROVEEDOR: ${id}`)
        let respuesta = await this.getProductsByAdminId(id);
        if(respuesta.length!=0){
          console.log(respuesta);
          await this.warningProductsByProvider(id,respuesta);
        }else{
          await this.deleteProviderById(id);
          console.log("SE ELIMINO AL PROVEEDOR")
          await this.successNotificationDeleteCorrectly();
        }
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
  async deleteProviderById(id:number){
    this.adminlistService.deleteProvider(id).toPromise().then((response) => {
    }).catch(e => console.error(e));
  }
  async deleteProductById(id:number){
    this.adminlistService.deleteProduct(id).toPromise().then((response) => {
    }).catch(e => console.error(e));
  }
  async getProductsByAdminId(id:number){
    let respuesta: product[];
    console.log("PRIMER METODO");
    await this.productlistService.getListProductsByProviderId(id).toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));

    return respuesta;
  }
}
