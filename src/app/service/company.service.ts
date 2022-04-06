import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { company } from 'src/app/models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl:string = environment.baseUrl; 
  constructor(private http:HttpClient){ }

  getListCompany():Observable<company[]> {
    const url = `${this.baseUrl}company`;
    let jwt= localStorage.getItem('token')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    console.log(url);
    return this.http.get<company[]>(url, { headers: reqHeader });
    
  }
}
