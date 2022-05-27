import { Component, OnInit } from '@angular/core';
import {PurchasesService} from '../../../../service/purchases.service';
import {CompraDepartamentoRequest} from '../../../../models/CompraDepartamentoRequest';

@Component({
  selector: 'app-dashboard-chart-by-city',
  templateUrl: './dashboard-chart-by-city.component.html',
  styleUrls: ['./dashboard-chart-by-city.component.css']
})
export class DashboardChartByCityComponent implements OnInit {

  constructor(private purchasesService:PurchasesService) { }

  listaDepartamentos:CompraDepartamentoRequest[]=[];

  async ngOnInit(): Promise<void> {
    this.listaDepartamentos = await this.loadData();
    console.log(this.listaDepartamentos);
  }

  async loadData(){
    let respuesta: CompraDepartamentoRequest[];
    console.log("PRIMER METODO");
    await this.purchasesService.getListPurchasesDepartment().toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));

    return respuesta;
  }

}
