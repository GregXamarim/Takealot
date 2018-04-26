import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../users/shared/customer.service';
import { Router } from '@angular/router';
import { AdminService } from '../admin/shared/admin.service';
import { ProductService } from '../product/shared/product.service';
import { CartService } from '../cart/shared/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../product/shared/product.model';
import { Cart } from '../cart/shared/cart.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[CustomerService,AdminService,ProductService,CartService]
})
export class HomeComponent implements OnInit {
  userClaims: any;
  adminClaims: any;
  cart: Cart;


  constructor(private toastr : ToastrService,private router: Router,private customerService : CustomerService,private adminService: AdminService,private productService : ProductService,private cartService : CartService) { }

  ngOnInit() {
    this.productService.getProductList();
    this.cartService.getCartList();
   // console.log(this.productService.productList);
    this.customerService.GetUserClaims().subscribe((data: any)=>{
      this.userClaims = data;
    });

  }
  

}
