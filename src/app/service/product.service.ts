import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FotosProducto } from '../models/FotosProducto';
import { ProductDetails } from '../models/ProductDetails';
import {product} from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProducService {
  private baseUrl:string = environment.baseUrl;
  constructor(private http:HttpClient){ }

  getProduct(idProducto:number, jwt:string):Observable<product> {
    const url = `${this.baseUrl}products/${idProducto}`;
    const reqHeader = new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
    });
    console.log(url);
    return this.http.get<product>(url, { headers: reqHeader });
  }
}
