import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {PurchasesService} from '../../../../service/purchases.service';
import {CompraCityRequest} from '../../../../models/CompraCityRequest';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ProductDetails} from '../../../../models/ProductDetails';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import { LOCALE_ID } from "@angular/core";
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard-chart-by-city',
  templateUrl: './dashboard-chart-by-city.component.html',
  styleUrls: ['./dashboard-chart-by-city.component.css']
})
export class DashboardChartByCityComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any

  displayedColumns: string[] = ['Id', 'Ciudad', 'CantidadProductos', 'MontoTotal'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<CompraCityRequest>;

  filterForm:FormGroup;

  listaCompraCiudades:CompraCityRequest[]=[];
  listCantidadVendidos:number[]=[];
  listLabelCiudades:string[]=[];

  public fechaActual:Date=new Date();
  public localID: string;
  constructor( @Inject( LOCALE_ID ) localID: string,
    private purchasesService:PurchasesService,
              private fb:FormBuilder,) {
    this.localID = localID;

    this.filterForm = this.fb.group({
      startDate: [formatDate(this.fechaActual, 'yyyy-MM-dd', this.localID), [Validators.required]],
      endDate: [formatDate(this.fechaActual, 'yyyy-MM-dd', this.localID), [Validators.required]]

    });
    this.chartOptions={
      series: [],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 600
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  async ngOnInit(): Promise<void> {
    this.listaCompraCiudades = await this.loadData();
    for(let i=0; i<this.listaCompraCiudades.length; i++){
      this.listLabelCiudades.push(this.listaCompraCiudades[i].nombreCiudad);
      this.listCantidadVendidos.push(this.listaCompraCiudades[i].cantidadVendidos);
    }
    console.log(this.listaCompraCiudades);

    this.dataSource= new MatTableDataSource<CompraCityRequest>(this.listaCompraCiudades)
    this.dataSource.paginator = this.paginator;

    this.chartOptions = {
      series: this.listCantidadVendidos,
      chart: {
        width: 380,
        type: "pie"
      },
      labels: this.listLabelCiudades,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400,
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  async loadData(){
    let respuesta: CompraCityRequest[];
    console.log("PRIMER METODO");
    await this.purchasesService.getListPurchasesCity().toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));

    return respuesta;
  }


  async aplicarFiltro() {
    console.log(this.filterForm.value)
    let startDate = this.filterForm.value.startDate;
    let endDate = this.filterForm.value.endDate;
    this.listaCompraCiudades = await this.loadDataWithFilters(startDate, endDate);
    this.listLabelCiudades = [];
    this.listCantidadVendidos=[];
    for(let i=0; i<this.listaCompraCiudades.length; i++){
      this.listLabelCiudades.push(this.listaCompraCiudades[i].nombreCiudad);
      this.listCantidadVendidos.push(this.listaCompraCiudades[i].cantidadVendidos);
    }
    console.log(this.listaCompraCiudades);

    this.chartOptions = {
      series: this.listCantidadVendidos,
      chart: {
        width: 380,
        type: "pie"
      },
      labels: this.listLabelCiudades,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400,
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.dataSource= new MatTableDataSource<CompraCityRequest>(this.listaCompraCiudades)
    this.dataSource.paginator = this.paginator;
  }
  async loadDataWithFilters(start,end){
    let respuesta;
    await this.purchasesService.getListPurchasesCityAndDatees(start,end).toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));

    return respuesta;
  }

  cambioFecha() {
    try{
      let startDate=this.filterForm.value.startDate;
      const stringDateStart: string = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
      this.filterForm.value.startDate=stringDateStart;
      console.log(this.filterForm.value.startDate)

      let endDate=this.filterForm.value.endDate;
      const stringDateEnd: string = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
      this.filterForm.value.endDate=stringDateEnd;
      console.log(this.filterForm.value.endDate)
    }catch (exception){

    }

  }
}
