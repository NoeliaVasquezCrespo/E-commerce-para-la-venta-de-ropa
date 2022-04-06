import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { admin } from 'src/app/models/Admin';

@Injectable({
  providedIn: 'root'
})
export class AdminlistService {

  private baseUrl:string = environment.baseUrl; 
  constructor(private http:HttpClient){ }

  getListAdmin():Observable<admin[]> {
    const url = `${this.baseUrl}administrators/type=2`;
    let jwt= localStorage.getItem('token')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    console.log(url);
    return this.http.get<admin[]>(url, { headers: reqHeader });
    
  }
}
