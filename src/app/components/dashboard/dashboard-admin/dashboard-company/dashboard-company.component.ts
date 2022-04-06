import { Component, OnInit } from '@angular/core';
import { productsDB } from 'src/app/shared/data/products';

@Component({
  selector: 'll-dashboard-company',
  templateUrl: './dashboard-company.component.html',
  styleUrls: ['./dashboard-company.component.scss']
})
export class DashboardCompanyComponent implements OnInit {
  view = 'list';
  advanceSearchExpanded: boolean = false;
  products;
  constructor() {}

  ngOnInit(): void {
    this.products = productsDB.Product;
  }
}
