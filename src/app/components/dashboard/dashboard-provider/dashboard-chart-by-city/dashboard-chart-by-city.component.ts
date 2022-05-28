import { Component, OnInit, ViewChild } from '@angular/core';
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

  listaCompraCiudades:CompraCityRequest[]=[];
  listCantidadVendidos:number[]=[];
  listLabelCiudades:string[]=[];


  constructor(private purchasesService:PurchasesService) {
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
    await this.purchasesService.getListPurchasesDepartment().toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));

    return respuesta;
  }


}
