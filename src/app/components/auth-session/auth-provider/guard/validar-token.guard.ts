import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  status:boolean=false;
  constructor(private authService:AuthService){}

  canActivate(): Observable<boolean> | boolean {
    console.log('canActivate');
    let id:number=parseInt(localStorage.getItem('userId'))||0;
    let token:string = localStorage.getItem('token')||"";
    return this.authService.validarToken(id,token);
  }
  canLoad(): Observable<boolean> | boolean {
    console.log('canLoad');
    let id:number=parseInt(localStorage.getItem('userId'))||0;
    let token:string = localStorage.getItem('token')||"";
    return this.authService.validarToken(id,token);
    
  }
}
