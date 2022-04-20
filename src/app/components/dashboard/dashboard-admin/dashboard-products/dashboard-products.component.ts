import {Component, OnInit, ViewChild} from '@angular/core';
import { ProductDetails } from 'src/app/models/ProductDetails';
import { HomeProductService } from 'src/app/service/home-product.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
@Component({
  selector: 'll-dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.scss']
})
export class DashboardProductsComponent implements OnInit {
  view = 'list';

  products:ProductDetails[]=[];
  displayedColumns = ['pruducto', 'marca', 'precio', 'stock','opciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<ProductDetails>;
  //obsProducts!: Observable<any>;

  constructor(private homeProductService:HomeProductService) {}

  async ngOnInit(): Promise<void> {
    this.products = await this.loadData();
    console.log(this.products)
    this.dataSource= new MatTableDataSource<ProductDetails>(this.products)
    this.dataSource.paginator = this.paginator;
    //this.obsProducts = this.dataSource.connect();
  }

  async loadData(){
    let respuesta;
    console.log("PRIMER METODO");
    //let idProvider:number = parseInt(localStorage.getItem('userId'));
    await this.homeProductService.getListProducts().toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));

    return respuesta;
  }


}
