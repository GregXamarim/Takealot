import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../shared/customer.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Customer } from '../shared/customer.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';


@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css'],
  providers:[CustomerService]
})
export class PersonalDetailsComponent implements OnInit {

userClaims : any;

  constructor(private customerService : CustomerService,private toastr : ToastrService) { }

  ngOnInit() {
    this.customerService.GetUserClaims().subscribe((data: any)=>{
      this.userClaims = data;
    });
    
  }

  onSubmit(form: NgForm){
     
      this.customerService.Putcustomer(form.value.custID, form.value).subscribe(data=> {
        this.toastr.info('Updated Successfully!');
      });
    
    
   
  }

}

