import { Component, OnInit } from '@angular/core';
import { productsDB } from '../../../../shared/data/products'; 
import axios from 'axios';
@Component({
  selector: 'll-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {
  products = [];
  constructor() { 
    this.products = productsDB.Product;
    this.getAllProductsData();
  }

  ngOnInit(): void { }

  getAllProductsData(){
    var api = 'http://localhost:8080/products';
    axios.get(api).then(function (result){
      console.log(result);
    })
  }
}
