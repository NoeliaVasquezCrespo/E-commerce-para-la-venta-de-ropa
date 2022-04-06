import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddproductService {
  private baseUrl:string = environment.baseUrl; 

  constructor(private http:HttpClient) { }
  uploadImageProduct(image: File, productId:number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('image', image);
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    const req = new HttpRequest('POST', `${environment.baseUrl}products/image/${productId}`, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: reqHeader
    });

    return this.http.request(req);
  }
}
