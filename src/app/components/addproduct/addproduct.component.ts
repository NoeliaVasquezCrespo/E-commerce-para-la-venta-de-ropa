import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { product } from '../../models/Product';
import axios from 'axios';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  constructor() { }

  public newProductForm = new FormGroup({
    codigoProducto: new FormControl('', Validators.required),
    nombreProducto : new FormControl('', Validators.required),
    descripcion : new FormControl('', Validators.required),
    stock : new FormControl('', Validators.required),
    precio : new FormControl('', Validators.required),
    colorId : new FormControl('', Validators.required),
    tallaId : new FormControl('', Validators.required),
    administradorId : new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    function setTwoNumberDecimal(event) {
      this.value = parseFloat(this.value).toFixed(2);
  }
  }

  addNewAdmin(data: product){
    var api = 'http://localhost:8080/products';
    var id = localStorage.getItem('userId');
    data.administradorId=parseInt(id);
    data.status=1;
    console.log('New Product : ', data);
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
    axios.post(api,data).then(function (result){
     console.log(result);
    })
  }
}
