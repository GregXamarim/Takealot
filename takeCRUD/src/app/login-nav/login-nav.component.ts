import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../users/shared/customer.service';
import { Cart } from '../cart/shared/cart.model';
import { CartService } from '../cart/shared/cart.service';
import { OrderService } from '../order/shared/order.service';
import { AddressService } from '../address/shared/address.service';
import { CheckoutService } from '../checkout/shared/checkout.service';

@Component({
  selector: 'app-login-nav',
  templateUrl: './login-nav.component.html',
  styleUrls: ['./login-nav.component.css'],
  providers:[CustomerService,CartService,OrderService,AddressService,CheckoutService]
})
export class LoginNavComponent implements OnInit {
  userClaims : any;
  cartDetails: Array<Cart> = [];
  arr1Length: number;
  totalQuantity: number;
  totQ : number = 0;
  constructor(private router: Router,private customerService : CustomerService,private cartService : CartService) { }

  ngOnInit() {
    this.customerService.GetUserClaims().subscribe((data: any)=>{
      this.userClaims = data;
    });
    this.cartService.getCartList();
    this.cartService.cartList.subscribe((cArray:Array<Cart>)=>{
      this.cartDetails = cArray;
      if(cArray.length > 0)
      {
        this.arr1Length = cArray.length;
        this.totalQuantity = this.totalCart();
       
      }
    });
  }
  Logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  totalCart(){
  
    for(var counter = 0;counter<this.arr1Length;counter++){
     
      this.totQ += this.cartDetails[counter].CartQuantity;
     }
      
  return this.totQ;
  }


}
