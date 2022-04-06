import { Component, OnInit } from '@angular/core';
import { productsDB } from '../../../shared/data/products';
import axios from 'axios';

@Component({
  selector: 'll-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  isLoaded: boolean;
  advanceSearchExpanded: boolean = false;
  products = [];
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.products = productsDB.Product;
      this.getAllProductsData();
      this.isLoaded = true
    }, 1000)
  }

  getAllProductsData(){
    var api = 'http://localhost:8080/products';
    axios.get(api).then(function (result){
      console.log(result);
    })
  }
}
