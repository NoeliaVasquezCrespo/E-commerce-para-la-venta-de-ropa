import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Compra } from '../models/Compra';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseUrl:string = environment.baseUrl;
  constructor(private http:HttpClient){ }

  registerPurchase(compra : Compra):Observable<Compra> {
    const url = `${this.baseUrl}purchases`;
    let jwt= localStorage.getItem('tokenCli')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    console.log(url);
    /*const req = new HttpRequest('POST', `${environment.baseUrl}purchases`, compra, {
        reportProgress: true,
        responseType: 'json',
        headers: reqHeader
      });
  
    return this.http.request(req);*/
    return this.http.post<Compra>(url, compra, { headers: reqHeader });
    
  }
}