import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Color } from '../models/Color';
import { Size } from '../models/Size';
import { product } from '../models/Product'

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  private baseUrl:string = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getListTallas():Observable<Size[]>{
    const url = `${this.baseUrl}sizes`;
    return this.http.get<Size[]>(url).pipe(
      map(
        response => response, error => error)); 

  }
  getListColours():Observable<Color[]>{
    const url = `${this.baseUrl}colours`;
    return this.http.get<Color[]>(url).pipe(
      map(
        response => response, error => error)); 
  }

  getProductById(id:number):Observable<product>{
    const url = `${this.baseUrl}products/${id}`;
    let jwt= localStorage.getItem('token')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    console.log(url);
    return this.http.get<product>(url, { headers: reqHeader });
  }


  updateProduct(idProvider:number,provider:product):Observable<product>{
    const url = `${this.baseUrl}products/${idProvider}`;
    let jwt= localStorage.getItem('token')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.put<product>(url,provider, { headers: reqHeader })
  }
}
