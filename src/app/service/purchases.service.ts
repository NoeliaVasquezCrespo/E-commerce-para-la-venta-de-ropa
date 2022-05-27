import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {company} from '../models/Company';
import {CompraDepartamentoRequest} from '../models/CompraDepartamentoRequest';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  private baseUrl:string = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getListPurchasesDepartment(){
    const url = `${this.baseUrl}purchases/department`;
    let jwt= localStorage.getItem('token')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    console.log(url);
    return this.http.get<CompraDepartamentoRequest[]>(url, { headers: reqHeader });

  }
}
