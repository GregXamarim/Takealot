import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../users/shared/customer.service';
import { Router } from '@angular/router';
import { ProductService } from '../product/shared/product.service';
import { Product } from '../product/shared/product.model';
import { Cart } from './shared/cart.model';
import { CartService } from './shared/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../users/shared/customer.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
 
})
export class CartComponent implements OnInit {
  userClaims: any;
  cart: Cart;
  customer : Customer;

  constructor(private toastr : ToastrService,private router: Router,private cartService: CartService,private customerService : CustomerService,private productService : ProductService) { }

  ngOnInit() {
    this.productService.getProductList();
    this.customerService.GetUserClaims().subscribe((data: any)=>{
      this.userClaims = data;
    });
  }

 

}
