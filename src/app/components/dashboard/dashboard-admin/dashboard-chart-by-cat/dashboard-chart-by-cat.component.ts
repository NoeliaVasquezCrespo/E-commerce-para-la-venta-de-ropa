import {Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {CategoryService} from '../../../../service/category.service';
import {Category} from '../../../../models/Category';
import * as html2pdf from 'html2pdf.js'
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";
import {PurchasesService} from '../../../../service/purchases.service';
import {ProductosVentasCategoria} from '../../../../models/ProductosVentasCategoria';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {CompraCityRequest} from '../../../../models/CompraCityRequest';
type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};
@Component({
  selector: 'app-dashboard-chart-by-cat',
  templateUrl: './dashboard-chart-by-cat.component.html',
  styleUrls: ['./dashboard-chart-by-cat.component.css']
})
export class DashboardChartByCatComponent implements OnInit {
  advanceFilterExpanded: boolean = false;
  filterForm:FormGroup;
  listCategories:Category[]=[{id: 0,categoria: "CATEGORIA"}];
  listPurchasesCategories:ProductosVentasCategoria[]=[];
  hintColor = '#ff0000';
  validHint: boolean=false;

  displayedColumns: string[] = ['Id', 'Categoria', 'SumaCantidad'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<ProductosVentasCategoria>;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public fechaActual:Date=new Date();
  public localID: string;
  private element:HTMLElement;

  constructor(@Inject( LOCALE_ID ) localID: string,
              private fb:FormBuilder,
              private categoryService:CategoryService,
              private purchasesService:PurchasesService) {
    this.localID = localID;
    this.filterForm = this.fb.group({
      startDate: [formatDate(this.fechaActual, 'yyyy-MM-dd', this.localID), [Validators.required]],
      endDate: [formatDate(this.fechaActual, 'yyyy-MM-dd', this.localID), [Validators.required]]
    });

    this.chartOptions = {
      series: [
        {
          name: "distibuted",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: [],
            fontSize: "12px"
          }
        }
      }
    };

  }

  async ngOnInit(): Promise<void> {
    this.listCategories = await this.getAllCategories();
    this.listPurchasesCategories= await this.getVentasCategorias();
    console.log(this.listPurchasesCategories);
    this.cargarDatosGraficoBarras();
    this.dataSource= new MatTableDataSource<ProductosVentasCategoria>(this.listPurchasesCategories)
    this.dataSource.paginator = this.paginator;

  }
  cargarDatosGraficoBarras(){
    this.chartOptions = {
      series: [
        {
          name: "distibuted",
          data: this.listPurchasesCategories.map(item => item.sumaCantidad),
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: this.listPurchasesCategories.map(item => item.categoria),
        labels: {
          style: {
            colors: [],
            fontSize: "12px"
          }
        }
      }
    };
  }
  async getAllCategories(){
    let respuesta: Category[] = [{id: 0, categoria: "--SELECCIONE UN CATEGORIA"}];
    await this.categoryService.getListTallas().toPromise().then((response) => {
      for(let i=0;i<response.length;i++){
        respuesta.push(response[i]);
      }
    }).catch(e => console.error(e));
    return respuesta;
  }

  async aplicarFiltro() {
    console.log(this.filterForm.value)
    this.listPurchasesCategories=[];
    this.listPurchasesCategories = await this.getVentasCategoriasDates(this.filterForm.value.startDate,this.filterForm.value.endDate)
    this.cargarDatosGraficoBarras();
    this.dataSource= new MatTableDataSource<ProductosVentasCategoria>(this.listPurchasesCategories)
    this.dataSource.paginator = this.paginator;
  }
  async getVentasCategorias(){
    let respuesta;
    await this.purchasesService.getListPurchasesCategories().toPromise().then((response) => {
      respuesta=response;
    }).catch(e => console.error(e));
    return respuesta;
  }
  async getVentasCategoriasDates(start,end){
    let respuesta;
    await this.purchasesService.getListPurchasesCategoriesByDates(start,end).toPromise().then((response) => {
      respuesta=response;
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

  generarReporte() {
    this.element = document.getElementById('content-print');
    console.log(this.element)
    var opt = {
      margin:       1,
      filename:     'output.pdf',
      image:        { type: 'jpeg', quality: 1.0 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'legal', orientation: 'landscape' }
    }
    html2pdf().from(this.element).set(opt).save();
  }
}
