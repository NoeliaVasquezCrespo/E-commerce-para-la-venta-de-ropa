import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { company } from '../../../../models/Company'
import axios from 'axios';
import Swal from'sweetalert2';

@Component({
  selector: 'll-dashboard-company',
  templateUrl: './dashboard-company.component.html',
  styleUrls: ['./dashboard-company.component.scss']
})
export class DashboardCompanyComponent implements OnInit {
  view = 'list';
  advanceSearchExpanded: boolean = false;
  constructor() {}

  public newCompanyForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    nit: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  addNewCompany(data: company){
    var api = 'http://localhost:8080/company';
    console.log('New Company: ', data);
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
    axios.post(api,data).then(function (result){
      console.log(result);
      this.successNotification();
    })
  }

}
