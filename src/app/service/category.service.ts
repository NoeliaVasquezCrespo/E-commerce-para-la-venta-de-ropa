import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../models/Category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl:string = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getListTallas():Observable<Category[]>{
    const url = `${this.baseUrl}categories`;
    return this.http.get<Category[]>(url).pipe(
      map(
        response => response, error => error)); 

  }
}  