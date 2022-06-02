import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

import {CompraCityRequest} from '../models/CompraCityRequest';
import {ProductosVentasCategoria} from '../models/ProductosVentasCategoria';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  private baseUrl:string = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getListPurchasesCity(idProveedor){
    const url = `${this.baseUrl}purchases/city/${idProveedor}`;
    let jwt= localStorage.getItem('token')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    console.log(url);
    return this.http.get<CompraCityRequest[]>(url, { headers: reqHeader });
  }
  getListPurchasesCityAndDatees(idProveedor,start,end){
    const url = `${this.baseUrl}purchases/city/${idProveedor}/${start}/${end}`;
    let jwt= localStorage.getItem('token')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    console.log(url);
    return this.http.get<CompraCityRequest[]>(url, { headers: reqHeader });
  }
  getListPurchasesCategories(){
    const url = `${this.baseUrl}purchases/categories`;
    let jwt= localStorage.getItem('token')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    console.log(url);
    return this.http.get<ProductosVentasCategoria[]>(url, { headers: reqHeader });
  }

  getListPurchasesCategoriesByDates(start,end){
    const url = `${this.baseUrl}purchases/categories/${start}/${end}`;
    let jwt= localStorage.getItem('token')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    console.log(url);
    return this.http.get<ProductosVentasCategoria[]>(url, { headers: reqHeader });
  }
}
