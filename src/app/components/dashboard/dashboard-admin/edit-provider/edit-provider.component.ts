import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { admin } from '../../../../models/Admin'
import axios from 'axios';
import Swal from'sweetalert2';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.scss']
})
export class EditProviderComponent implements OnInit {

  constructor() { }

  public newAdminForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    correoElectronico: new FormControl('', Validators.required),
    empresaId: new FormControl('', Validators.required),
  });

  editProvider(data: admin){
  } 
  ngOnInit(): void {
  }

}
