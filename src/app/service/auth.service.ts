import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../models/AuthRequest';
import { JwtResponse } from '../models/JwtResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string = environment.baseUrl; 

  constructor(private http:HttpClient) { }
  
  login(auth:AuthRequest):Observable<JwtResponse>{
    console.log("ACCEDIENDO A SERVICIO");
    const url = `${this.baseUrl}user/login`;
    console.log(url);
    
    return this.http.post<JwtResponse>(url,auth);


  }
  
}
