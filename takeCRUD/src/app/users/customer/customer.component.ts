import { Component, OnInit } from '@angular/core';


import {CustomerService} from '../shared/customer.service'
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../shared/customer.model';
import { CartService } from '../../cart/shared/cart.service';
import { OrderService } from '../../order/shared/order.service';
import { AddressService } from '../../address/shared/address.service';
import { CheckoutService } from '../../checkout/shared/checkout.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers:[CustomerService,CartService,OrderService,AddressService,CheckoutService]

})
export class CustomerComponent implements OnInit {

  constructor(private customerService : CustomerService,private toastr : ToastrService) { }

  ngOnInit() {
  
    this.resetForm();
   
  
  }


  resetForm(form?:NgForm){
    if(form != null)
    form.reset();
    this.customerService.selectedCustomer = {
      custID : null,
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      Gender: '',
      Birthday: ''
  
    }
  }
 
  
  onSubmit(form: NgForm){
    this.customerService.postcustomer(form.value)
    .subscribe(data => {
        this.resetForm(form);
       
        this.toastr.success('Registered Successfully','Register Customer');               
     })
  
 
}


}
