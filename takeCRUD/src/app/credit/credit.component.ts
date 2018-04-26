import { Component, OnInit } from '@angular/core';
import { Credit } from './shared/credit.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CreditService } from './shared/credit.service';
import { CustomerService } from '../users/shared/customer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css'],
  providers: [CreditService,CustomerService]
})
export class CreditComponent implements OnInit {

  userClaims: any;
  credit: Credit;
  newDate:any;

  constructor(private toastr : ToastrService,private router: Router,private creditService: CreditService,private customerService: CustomerService) { }

  ngOnInit() {
    this.resetForm();
    this.creditService.GetCredit().subscribe((data: any) =>{
      this.credit = Object.assign({},data.json());
      this.creditService.selectedCredit = Object.assign({},data.json());
      console.log(this.credit.PaymentID)
    });
     

    this.customerService.GetUserClaims().subscribe((data: any)=>{
      this.userClaims = data;
    });
  }
    
  resetForm(form? : NgForm) {
    if (form != null)
      form.reset();
      this.creditService.selectedCredit = {
        CardID : 0,
        PaymentID: +localStorage.getItem("PaymentID"),
        CardDescription : '',
        NameOnCard : '',
        ExpDate : new Date()
        
    }
  }
  
  
  onSubmit(form : NgForm) {
  
    if(form.value.CardID == 0){
      this.creditService.PostCredit(form.value)
      .subscribe( data => {
       this.resetForm(form);
       this.creditService.GetCredit().subscribe((data: any) =>{
        this.credit = Object.assign({},data.json());
      });
        this.toastr.success('Added successfully!');
      })
    }else{
      this.creditService.PutCredit(form.value.CardID, form.value).subscribe(data=> {
       
        this.creditService.GetCredit().subscribe((data: any) =>{
          this.credit = Object.assign({},data.json());
        });
       this.toastr.info('Updated Successfully!');
  });

    }
      
    }

}
