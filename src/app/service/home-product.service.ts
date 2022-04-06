import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Size } from 'tsparticles/dist/Options/Classes/Particles/Size/Size';
import { FotosProducto } from '../models/FotosProducto';
import { ProductDetails } from '../models/ProductDetails';

@Injectable({
  providedIn: 'root'
})
export class HomeProductService {
  private baseUrl:string = environment.baseUrl; 

  constructor(private http:HttpClient){ }

  getListProducts():Observable<ProductDetails[]> {
    const url = `${this.baseUrl}products/details`;
    return this.http.get<ProductDetails[]>(url).pipe(
      map(
        response => response, error => error)); 
  }
  getListProductsByProviderId(idProvider:number):Observable<ProductDetails[]> {
    const url = `${this.baseUrl}products/details/${idProvider}`;
    return this.http.get<ProductDetails[]>(url).pipe(
      map(
        response => response, error => error)); 
  }
  getFirstImageByProductId(idProducto:number):Observable<FotosProducto>{
    const url = `${this.baseUrl}products/image/${idProducto}`;
    return this.http.get<FotosProducto>(url).pipe(
      map(
        response => response, error => error)); 
  }
  // getRouteImage(path:string, name:string){
  //   const url = `${this.baseUrl}products/image/${idProducto}`;
    
  // }
}
