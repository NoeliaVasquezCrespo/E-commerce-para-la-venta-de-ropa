import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Address } from '../models/Address';

@Injectable({
    providedIn: 'root'
  })
export class AddressService {
    private baseUrl:string = environment.baseUrl;

    constructor(private http:HttpClient){ }

    getProductByProductId(id:number):Observable<Address>{
        const url = `${this.baseUrl}addresses/${id}`;
        return this.http.get<Address>(url).pipe(
          map(
            response => response, error => error));
    }
}