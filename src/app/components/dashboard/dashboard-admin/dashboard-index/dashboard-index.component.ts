import { Component, OnInit } from '@angular/core';
import { AdministradorRequest } from 'src/app/models/AdministradorRequest';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'll-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.scss']
})
export class DashboardIndexComponent implements OnInit {
  orders = [];
  administrator:AdministradorRequest;
  constructor(private authService:AuthService) {}

  async ngOnInit(): Promise<void> {
    
    let id:number=parseInt(localStorage.getItem('userId'));
    let token:string = localStorage.getItem('token');
    let staus:boolean=false;
    await this.authService.verificarSesion(id,token).subscribe(
      resp => {
        this.administrator=resp;
        console.log("LOS DATOS DEL USUARIO SON");
        console.log(this.administrator);
        
      },error=>{
        console.log("error");
      });

    this.orders = [
      {
        id: 'e5dcdfsf',
        orderBy: 'Dean Lynch',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'complated',
        price: 2145.0
      },
      {
        id: 'e5dcdfsf',
        orderBy: 'Lynch Dean',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'pending',
        price: 2145.0
      },
      {
        id: 'e5dcdfsf',
        orderBy: 'Lynch Dean',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'rejected',
        price: 2145.0
      },
      {
        id: 'e5dcdfsf',
        orderBy: 'Dean Lynch',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'initialized',
        price: 2145.0
      },
      {
        id: 'e5dcdfsf',
        orderBy: 'Dean Lynch',
        productId: 'cdfsfe5d',
        created: '25.05.2021, 10:00',
        status: 'complated',
        price: 2145.0
      }
    ];
  }
}
