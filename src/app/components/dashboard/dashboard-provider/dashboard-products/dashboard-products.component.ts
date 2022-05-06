import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProductDetails } from 'src/app/models/ProductDetails';
import { HomeProductService } from 'src/app/service/home-product.service';
import Swal from'sweetalert2';
import {AdminlistService} from '../../../../service/adminlist.service';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'll-dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.scss']
})
export class DashboardProductsComponent implements OnInit {
  view = 'list';

  displayedColumns: string[] = ['Producto', 'Precio', 'Stock', 'Opciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<ProductDetails>;


  products:ProductDetails[]=[];
  constructor(private homeProductService:HomeProductService,
              private adminlistService:AdminlistService) {}

  async ngOnInit(): Promise<void> {
    this.products = await this.loadData();
    console.log(this.products)
    this.dataSource= new MatTableDataSource<ProductDetails>(this.products)
    this.dataSource.paginator = this.paginator;
  }

  async loadData(){
    let respuesta;
    console.log("PRIMER METODO");
    let idProvider:number = parseInt(localStorage.getItem('userId'));
    await this.homeProductService.getListProductsByProviderId(idProvider).toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));

    return respuesta;
  }

  async mensajeEliminarProducto(idProducto:number) {
    console.log("VISUALIZAR MENSAJE ELIMINAR PRODUCTO")
    console.log(`ID PRODUCTO: ${idProducto}`)
    Swal.fire({
      icon: 'warning',
      title: 'Eliminacion de Producto',
      text: '¿Esta seguro de eliminar el producto?',
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async resultado => {

      if (resultado.value) {
        console.log("*se eliminara el producto*");
        await this.eliminarProducto(idProducto);
        this.products = [];
        this.products = await this.loadData();
        console.log(this.products);
        this.dataSource= new MatTableDataSource<ProductDetails>(this.products)
        this.dataSource.paginator = this.paginator;
        console.log("PRODUCTO ELIMINADO")
      } else {
        console.log("*NO se eliminara el producto*");
      }
    });

  }

  private async eliminarProducto(idProducto: number) {
    await this.adminlistService.deleteProduct(idProducto).toPromise().then((response) => {
      console.log("Producto Eliminado");
    }).catch(e => console.error(e));
  }
}
