import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Offer } from '../models/Offer';
import { OfferProduct } from '../models/OfferProduct';
import { ProductDetails } from '../models/ProductDetails';
@Injectable({
  providedIn: 'root'
})
export class AddofferService {

  private baseUrl:string = environment.baseUrl; 

  constructor(private http:HttpClient) { }

  newOffer(provider:Offer):Observable<Offer>{
    console.log(provider);
    const url = `${this.baseUrl}oferta`;
    let jwt= localStorage.getItem('token')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });

    return this.http.post<Offer>(url,provider, { headers: reqHeader })
  }

  newOfferProduct(idProducto:number,idOferta:number):Observable<Offer>{
    console.log();
    let compraoferta: OfferProduct = {
      ofertaId: idOferta,
      productoId: idProducto
    }
    const url = `${this.baseUrl}oferta/producto`;
    let jwt= localStorage.getItem('token')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });

    return this.http.post<Offer>(url,compraoferta, { headers: reqHeader })
  }

  getListProvider():Observable<OfferProduct[]> {
    const url = `${this.baseUrl}/oferta/producto`;
    let jwt= localStorage.getItem('token')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    console.log(url);
    return this.http.get<OfferProduct[]>(url, { headers: reqHeader });
  }
}
