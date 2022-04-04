import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-providers',
  templateUrl: './dashboard-providers.component.html',
  styleUrls: ['./dashboard-providers.component.scss']
})
export class DashboardProvidersComponent implements OnInit {
  orders = [];

  constructor() {}

  ngOnInit(): void {
    this.orders = [
      {
        id: '1',
        orderBy: '----',
        productId: '----',
        created: '----',
        status: '----',
        price: '----'
      }
    ];
  }
}
