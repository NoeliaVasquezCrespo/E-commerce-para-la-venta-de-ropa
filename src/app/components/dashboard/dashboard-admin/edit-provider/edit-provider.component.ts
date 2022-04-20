import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { admin } from '../../../../models/Admin'
import axios from 'axios';
import Swal from'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminlistService} from '../../../../service/adminlist.service';
import {CompanyService} from '../../../../service/company.service';
import {company} from '../../../../models/Company';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.scss']
})
export class EditProviderComponent implements OnInit {



  idParam:number;
  adminProvider:admin;
  updateProviderAdmin:admin;
  companiesList:company[];
  newAdminForm:FormGroup;

  //public newAdminForm = new FormGroup();
  constructor(private activatedRoute: ActivatedRoute,
              private adminListService:AdminlistService,
              private fb:FormBuilder,
              private companyService:CompanyService,
              private router: Router,) {
    this.newAdminForm=this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      edad: new FormControl('', Validators.required),
      correoElectronico: new FormControl('', Validators.required),
      empresaId: new FormControl(0, Validators.required),
    })
  }
  async editProvider(){
    console.log(this.newAdminForm.value);
    let newProvider:admin={
      password: this.adminProvider.password,
      status: this.adminProvider.status,
      tipoAdministradorId: this.adminProvider.tipoAdministradorId,
      apellido: this.newAdminForm.value.apellido,
      correoElectronico: this.newAdminForm.value.correoElectronico,
      edad: this.newAdminForm.value.edad,
      empresaId: this.newAdminForm.value.empresaId,
      nombre: this.newAdminForm.value.nombre
    }
    await this.updateProvider(newProvider);

  }
  async updateProvider(provider:admin){
    let respuesta;
    this.adminListService.updateProvider(this.idParam,provider).toPromise().then(async (response) => {
      respuesta = response;
      console.log("LA RESPUESTA ES:")
      console.log(respuesta)
      console.log("FIN RESPUESTA")
      if(respuesta!=null){
          await this.successNotificationLogin();
      }
    }).catch(e => console.error(e));
    return respuesta;
  }
  async ngOnInit(): Promise<void> {
    this.idParam = this.activatedRoute.snapshot.params.id;

    this.companiesList=await this.getCompanies();

    console.log(this.idParam);
    this.adminProvider = await this.getAdminById(this.idParam);
    console.log(this.adminProvider);
    this.newAdminForm.setValue(
      {
        nombre: this.adminProvider.nombre,
        apellido: this.adminProvider.apellido,
        edad: this.adminProvider.edad,
        correoElectronico: this.adminProvider.correoElectronico,
        empresaId: this.adminProvider.empresaId,
      });
    console.log(this.newAdminForm.value);

  }
  async getAdminById(id:number):Promise<admin>{
    let respuesta:admin;
    console.log("PRIMER METODO");
    //let idProvider:number = parseInt(localStorage.getItem('userId'));
    await this.adminListService.getAdminById(id).toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));
    return respuesta;
  }
  async getCompanies(){
    let respuesta:company[];
    //let idProvider:number = parseInt(localStorage.getItem('userId'));
    await this.companyService.getListCompany().toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));
    return respuesta;
  }

  successNotificationLogin(){
    Swal.fire({
      title: 'Exito',
      text: 'Datos Actualizados correctamente',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    }).then(async (result) => {
      if (result.value) {
        console.log('admin dashboard')
        await this.router.navigateByUrl('/admindashboard/providers');
        //window.location.href="http://localhost:4200"
      }
    })
  }

}
