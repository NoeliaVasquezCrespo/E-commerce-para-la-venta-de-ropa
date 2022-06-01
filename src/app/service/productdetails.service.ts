import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ProductCharacteristic } from '../models/ProductCharacteristic';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private baseUrl:string = environment.baseUrl;
  constructor(private http:HttpClient){ }

  getProductDetailsByIdProduct(idProducto:number):Observable<ProductCharacteristic> {
    const url = `${this.baseUrl}productDescriptions/productId=${idProducto}`;
    console.log(url);
    return this.http.get<ProductCharacteristic>(url);
  }
  updateStock(idProducto:number,cantidad:number):Observable<ProductCharacteristic> {
    const url = `${this.baseUrl}productDescriptions/productId=${idProducto}/stock=${cantidad}`;
    console.log(url);
    let jwt= localStorage.getItem('tokenCli')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    return this.http.put<ProductCharacteristic>(url ,{},{ headers: reqHeader });
  }
}
