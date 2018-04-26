import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EftService } from './shared/eft.service';
import { CustomerService } from '../users/shared/customer.service';
import { NgForm } from '@angular/forms';
import { Eft } from './shared/eft.model';

@Component({
  selector: 'app-eft',
  templateUrl: './eft.component.html',
  styleUrls: ['./eft.component.css'],
  providers:[EftService,CustomerService]
})
export class EftComponent implements OnInit {

  userClaims: any;
  eft: Eft;

  constructor(private toastr : ToastrService,private router: Router,private eftService: EftService,private customerService: CustomerService) { }

  ngOnInit() {
    this.resetForm();
    this.eftService.GetEFT().subscribe((data: any) =>{
      this.eft = Object.assign({},data.json());
      this.eftService.selectedeft = Object.assign({},data.json());
      console.log(this.eft.PaymentID)
    });
     

    this.customerService.GetUserClaims().subscribe((data: any)=>{
      this.userClaims = data;
    });
  }
    
  resetForm(form? : NgForm) {
    if (form != null)
      form.reset();
      this.eftService.selectedeft = {
        AccountID : 0,
        PaymentID: +localStorage.getItem("PaymentID"),
        AccountHolder : '',
        AccountNumber : '',
        Bank : '',
        BranchCode : ''
    }
  }
  
  onSubmit(form : NgForm) {
  
    if(form.value.AccountID == 0){
      this.eftService.PostEFT(form.value)
      .subscribe( data => {
       this.resetForm(form);
       this.eftService.GetEFT().subscribe((data: any) =>{
        this.eft = Object.assign({},data.json());
      });
        this.toastr.success('Added successfully!');
      })
    }else{
      this.eftService.PutEFT(form.value.AccountID, form.value).subscribe(data=> {
       
        this.eftService.GetEFT().subscribe((data: any) =>{
          this.eft = Object.assign({},data.json());
        });
       this.toastr.info('Updated Successfully!');
  });

    }
      
    }
}
