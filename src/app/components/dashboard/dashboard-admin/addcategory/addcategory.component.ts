import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { AddproductService } from 'src/app/service/addproduct.service';
import { Category } from 'src/app/models/Category';
import { catProd } from 'src/app/models/CategoryProduct';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';
import { createR3ProviderExpression } from '@angular/compiler';
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
  form: FormGroup;
  errorMsg = '';
  seleccionadas: Category[];
  listCategoria:Category[]=[{id:0, categoria:"Categoria"}];
  id:number=0;
  constructor(private formBuilder: FormBuilder,private categoryService:CategoryService, private activatedRoute: ActivatedRoute) {
    this.form = this.formBuilder.group({

      categorias: this.formBuilder.array([], [Validators.required])

    })
   }

   onCheckboxChange(e) {
    const categorias: FormArray = this.form.get('categorias') as FormArray;
    if (e.target.checked) {
      categorias.push(new FormControl(e.target.value));
    } else {
       const index = categorias.controls.findIndex(x => x.value === e.target.value);
       categorias.removeAt(index);
    }
  }
  async submit(){
    console.log(this.form.value);
    var cont=0;
    for(let i=0;i<this.form.value.categorias.length;i++){
      var json={
        "categoriaId":this.form.value.categorias[i],
        "productoId":this.id,
        "status":1
      }
      console.log(json);
      var api = 'http://localhost:8080/v2/categoryProduct';
      axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
      await axios.post(api,json).then(function (result){
        console.log(result);
        cont++;
      })
    }
    if(cont==this.form.value.categorias.length){
      this.successNotification();
    }else{
      this.wrongNotification();
    }
  }

  wrongNotification(){
    Swal.fire({
      icon: 'error',
      title: 'Error en el registro'
    })
  }
  successNotification(){
    Swal.fire({
      title: 'CORRECTO',
      text: 'Categorias Asignadas Correctamente',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.value) {
        console.log('admin dashboard')
        window.location.href="http://localhost:4200/admindashboard/products"
      }
    })
  } 
    

  ngOnInit(): void {
    this.getCategoryData();
    this.id = this.activatedRoute.snapshot.params.id;
    console.log("El id del producto es "+ this.id);
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
