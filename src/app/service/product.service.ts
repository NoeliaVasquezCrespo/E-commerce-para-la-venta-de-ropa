import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl:string = environment.baseUrl;
  constructor(private http:HttpClient){ }

  getProduct(idProducto:number):Observable<Producto> {
    const url = `${this.baseUrl}products/id=${idProducto}`;
    console.log(url);
    return this.http.get<Producto>(url);
  }
}
