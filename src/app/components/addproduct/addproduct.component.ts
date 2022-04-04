import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    function setTwoNumberDecimal(event) {
      this.value = parseFloat(this.value).toFixed(2);
  }
  }

  
}
