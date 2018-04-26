import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CartService } from '../cart/shared/cart.service';
import { CustomerService } from '../users/shared/customer.service';
import { ProductService } from '../product/shared/product.service';
import { AddressService } from './shared/address.service';
import { NgForm } from '@angular/forms';
import { Address } from './shared/address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers:[CartService,CustomerService,AddressService]
})
export class AddressComponent implements OnInit {
  userClaims: any;
  addr: number;

  constructor(private toastr : ToastrService,private router: Router,private cartService: CartService,private customerService : CustomerService,private addressService : AddressService) { }

  ngOnInit() {
    this.resetForm();
    this.addressService.getAddressList();


    this.addressService.getAddress().subscribe((data: any) =>{
      this.addressService.addressList = Object.assign({},data.json());
      localStorage.setItem("AddressID",this.addressService.addressList[0].AddressID+'');  // Get Address Details
     this.addr = this.addressService.addressList[0].AddressID
    });
     

    this.customerService.GetUserClaims().subscribe((data: any)=>{ // Get User Claims
      this.userClaims = data;
    });
  }
    
  resetForm(form? : NgForm) {
    if (form != null)
      form.reset();
    this.addressService.selectedAddress = {
      AddressID : 0,
      custID: +localStorage.getItem("custID"),
      RecipientName : '',
      ContactNum : '',
      AddressType : '',
      StandNo : '',
      StreetAddress : '',
      Suburb: '',
      City: '',
      PostalCode: '' 
    }
  }
  
  onSubmit(form : NgForm) { // Register And Update Address
    if(this.addr > 0){


        this.addressService.PutAddress(this.addr, form.value).subscribe(data=> {
          this.addressService.getAddressList();
          this.toastr.info('Updated Successfully!');
     });
      
  
    }else{
  this.addressService.PostAddress(form.value)
  .subscribe( data => {
   this.resetForm(form);
   this.addressService.getAddressList();
    this.toastr.success('Address added successfully!');
  })
    }
      
    }
   
}
