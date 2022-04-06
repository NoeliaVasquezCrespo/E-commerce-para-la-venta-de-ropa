import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Color } from '../models/Color';
import { Size } from '../models/Size';

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
}
