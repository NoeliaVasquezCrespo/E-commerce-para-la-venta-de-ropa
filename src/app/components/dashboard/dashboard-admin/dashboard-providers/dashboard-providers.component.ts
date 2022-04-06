import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {admin} from '../../../../models/Admin'
import axios from 'axios';

export var ADMIN_DATA: admin[]=[];
@Component({
  selector: 'app-dashboard-providers',
  templateUrl: './dashboard-providers.component.html',
  styleUrls: ['./dashboard-providers.component.scss']
})

export class DashboardProvidersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'edad', 'correoElectronico','userName'];
  public dataSource = [];
  stringJson: any;
  stringObject: any;

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:true}) sort: MatSort;
  

  constructor() {
  }

  async ngOnInit() {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
    var api = 'http://localhost:8080/administrators/type=1';
    axios.get(api, {responseType: 'json'}).then(function (result){
      console.log(result.data);
      this.stringJson = JSON.stringify(result.data);
      this.stringObject = JSON.parse(this.stringJson);
    })
   
  }


}
