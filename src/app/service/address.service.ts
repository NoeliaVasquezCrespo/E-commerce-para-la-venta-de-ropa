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

    getAddressById(id:number):Observable<Address>{
        const url = `${this.baseUrl}addresses/${id}`;
        let jwt= localStorage.getItem('tokenCli')
            const reqHeader = new HttpHeaders({
            'Authorization': `Bearer ${jwt}`
        })
        return this.http.get<Address>(url, { headers: reqHeader }).pipe(
          map(
            response => response, error => error));
    }
}