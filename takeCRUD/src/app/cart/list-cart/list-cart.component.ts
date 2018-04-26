import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../product/shared/product.model';
import { Cart } from '../shared/cart.model';
import { Customer } from '../../users/shared/customer.model';
import { CustomerService } from '../../users/shared/customer.service';
import { CartInfoService } from '../shared/cart-info.service';
import { ProductService } from '../../product/shared/product.service';
import { CartInfo } from '../shared/cart-info.model';
import { AddressService } from '../../address/shared/address.service';


@Component({
  selector: 'app-list-cart',
  templateUrl: './list-cart.component.html',
  styleUrls: ['./list-cart.component.css'],
  providers:[CartService,CartInfoService,ProductService,CustomerService,AddressService]
})
export class ListCartComponent implements OnInit {
  cart: Cart;
  product: Product;
  arr1Length: number;
  arr2Length: number;
  totQ : number = 0;
  totP : number = 0;
  totC: number;
  totalQuantity: number;
  totalP : number;
  totCost: number = 0;
  cartDetails: Array<Cart> = [];
  cartInfo: Array<CartInfo> = [];
  userClaims: any;
  message: string;
  quant: number;
  avail: boolean = true;

  constructor(private router: Router,private customerService: CustomerService,private cartService : CartService,private toastr : ToastrService,private cartInfoService : CartInfoService,private productService : ProductService) { }

  ngOnInit() {
    this.productService.getProductList();
    this.cartService.getCartList();
    this.cartInfoService.getCartInfoList();

     this.cartService.cartList.subscribe((cArray:Array<Cart>)=>{
       this.cartDetails = cArray;
       if(cArray.length > 0)
       {
         this.arr1Length = cArray.length;
         this.totalQuantity = this.totalCart();
        
       }
     });

     this.cartInfoService.cartListInfo.subscribe((cartArray:Array<CartInfo>)=>{
       this.cartInfo = cartArray;
       if(cartArray.length > 0){
        this.arr2Length = cartArray.length;
        this.totalP = this.totalPrice(); 
        //this.totCost =  this.totalCost();
       }
      
     })
    

     this.customerService.GetUserClaims().subscribe((data: any)=>{
      this.userClaims = data;
     
    });
   
  }
  editCart(cart : Cart){
    var cartQ = parseInt((document.getElementById("cQuantity") as HTMLInputElement).value);
    this.productService.getProdByID(cart.ProductID).subscribe((data :any)=>{
          this.product =  data.json();
          this.totalQuantity = this.product.Quantity
       
        this.quant = cartQ;
        this.cart ={
          CartID: cart.CartID,
          ProductID: cart.ProductID,
          custID: +localStorage.getItem("custID"),
          CartQuantity:  cart.CartQuantity
    
        }
           if( cart.CartQuantity <  this.product.Quantity)
           {
              this.avail = true;
              this.cartService.PutCart(cart.CartID,this.cart).subscribe(data =>{
                this.cartService.getCartList();   
                this.toastr.info('Added to Cart!');
              });
              
           }else  if(cart.CartQuantity > this.product.Quantity)
           {
           
              this.avail = false;
            
           }

            

          })

 location.reload();

    }
    
  onDelete(id: number){
    if(confirm('Are you sure you want to delete this Cart?')==true){
      this.cartService.DeleteCart(id)
      .subscribe(x=>{
        this.cartService.getCartList();
        location.reload();
        this.toastr.warning("Deleted Successfully","Cart");
        
      })
    }
   
  }
  totalCart(){
  
      for(var counter = 0;counter<this.arr1Length;counter++){
       
        this.totQ += this.cartDetails[counter].CartQuantity;
       }
        
    return this.totQ;
    }
   
    totalPrice(){
  
      for(var counter = 0;counter<this.arr2Length;counter++){
       
        this.totP += this.cartInfo[counter].Price *  this.cartDetails[counter].CartQuantity;
       }
        
    return this.totP;
    }
  // totalCost(){

    
       
   //   return this.totC = this.totalCart() * this.totalPrice();
     

  // }

  
 

}
