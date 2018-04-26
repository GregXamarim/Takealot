import { Component, OnInit } from '@angular/core';
import { Cart } from '../shared/cart.model';
import { Customer } from '../../users/shared/customer.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CustomerService } from '../../users/shared/customer.service';
import { ProductService } from '../../product/shared/product.service';
import { Product } from '../../product/shared/product.model';
import { CartService } from '../shared/cart.service';
import { CartInfoService } from '../shared/cart-info.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css'],
  providers:[CartInfoService]
})
export class AddCartComponent implements OnInit {

  userClaims: any;
  cart: Cart;
  customer : Customer;


  constructor(private toastr : ToastrService,private router: Router,private cartService: CartService,private customerService : CustomerService,private productService : ProductService) { }

  ngOnInit() {
    this.cartService.getCartList();
    this.productService.getProductList();
    this.customerService.GetUserClaims().subscribe((data: any)=>{
      this.userClaims = data;
      localStorage.setItem("custID",this.userClaims.custID);
    });
   
  }
  addCart(product: Product){
    this.cart ={
      CartID: 0,
      ProductID: product.ProductID,
      custID: +localStorage.getItem("custID"),
      CartQuantity: 1

    }
   
      this.cartService.PostCart(this.cart).subscribe(data =>{
        this.cartService.getCartList();
        this.toastr.info('Added to Cart!');
      });
    }
 

   
  
   
   



}
