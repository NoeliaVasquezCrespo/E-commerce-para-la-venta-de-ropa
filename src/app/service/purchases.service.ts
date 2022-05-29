import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

import {CompraCityRequest} from '../models/CompraCityRequest';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  private baseUrl:string = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getListPurchasesCity(){
    const url = `${this.baseUrl}purchases/city`;
    let jwt= localStorage.getItem('token')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    console.log(url);
    return this.http.get<CompraCityRequest[]>(url, { headers: reqHeader });
  }
  getListPurchasesCityAndDatees(start,end){
    const url = `${this.baseUrl}purchases/city/${start}/${end}`;
    let jwt= localStorage.getItem('token')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    console.log(url);
    return this.http.get<CompraCityRequest[]>(url, { headers: reqHeader });
  }
}
