import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { product } from '../../../../models/Product';
import axios from 'axios';
import { AddproductService } from 'src/app/service/addproduct.service';
import { Category } from 'src/app/models/Category';

import { CategoryService } from 'src/app/service/category.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from'sweetalert2';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  errorMsg = '';
  listCategoria:Category[]=[{id:0, categoria:"Categoria"}];
  newProductoId:number=0;
  constructor(private addProductService:AddproductService,private categoryService:CategoryService,
    private router: Router) { }

  public newProductForm = new FormGroup({
    categoria: new FormControl(this.listCategoria[0]),   
  });

  ngOnInit(): void {
    
    this.getCategoryData();
    
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  getCategoryData(){
    this.categoryService.getListTallas().toPromise().then((response) => {
      console.log("LA RESPUESTA ES: ");
      console.log(response);
      this.listCategoria=response;
    }).catch(e => console.error(e));

    console.log(this.listCategoria);
  }
  
  
}
