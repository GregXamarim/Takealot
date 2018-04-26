import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart/shared/cart.model';
import { CartInfo } from '../cart/shared/cart-info.model';
import { Router } from '@angular/router';
import { CustomerService } from '../users/shared/customer.service';
import { CartService } from '../cart/shared/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CartInfoService } from '../cart/shared/cart-info.service';
import { ProductService } from '../product/shared/product.service';
import { CheckoutService } from '../checkout/shared/checkout.service';
import { OrderService } from './shared/order.service';
import { Order } from './shared/order.model';
import { AddressService } from '../address/shared/address.service';
import { NgForm } from '@angular/forms';
import { OrderItem } from './shared/order-item.model';
import { OrderItemService } from './shared/order-item.service';
import { Product } from '../product/shared/product.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers:[CustomerService,CartService,OrderService,AddressService,CheckoutService,CartInfoService,ProductService,OrderItemService]

})
export class OrderComponent implements OnInit {
  totP : number = 0;
  totQ : number = 0;
  totalQuantity: number;
  totalP : number;
  cartDetails: Array<Cart> = [];
  arr1Length: number;
  arr2Length: number;
  arr3Length: number;
  cartInfo: Array<CartInfo> = [];
  userClaims: any;
  orderDate: any;
  tDate: any;
  order: Order;
  orderItem: OrderItem;
  Total: number = 0;
  prod:  Array<Product> = [];
  newPQ: number = 0;
  cartQuan: number = 0;
  totQuan: number = 0;
  product: Product

  




  constructor(private router: Router,private customerService: CustomerService,private cartService : CartService,private toastr : ToastrService,private cartInfoService : CartInfoService,private productService : ProductService,private paymentService:CheckoutService,private orderService: OrderService,private orderItemService: OrderItemService) { }

  ngOnInit() {
      
    this.orderDate = { 
      todayDate: this.getToday(),
      after3: this.getDeliveryAfter3(), // Get Dates
      after5: this.getDeliveryAfter5()

    }
    this.tDate={
      todayDate: this.getToday() // Get today's date
    }
   
    this.cartService.getCartList();
    this.cartService.cartList.subscribe((cArray:Array<Cart>)=>{ // Get cart array
      this.cartDetails = cArray;
      if(cArray.length > 0)
      {
        this.arr1Length = cArray.length;
        this.totalQuantity = this.totalCart();
       
       
      }
    });
   
    this.cartInfoService.getCartInfoList();
    this.cartInfoService.cartListInfo.subscribe((cartArray:Array<CartInfo>)=>{ // Get cart info array
      this.cartInfo = cartArray;
      if(cartArray.length > 0){
       this.arr2Length = cartArray.length;
       this.totalP = this.totalPrice(); 
     localStorage.setItem("totalP", this.totalP+'');
        
      }
     
    })
   
  
   

    this.customerService.GetUserClaims().subscribe((data: any)=>{
     this.userClaims = data;
    
   });

 
  }
  totalCart(){
  
    for(var counter = 0;counter<this.arr1Length;counter++){
     
      this.totQ += this.cartDetails[counter].CartQuantity;  //Calculate cart quantity
     }
      
  return this.totQ;
  }
 
  totalPrice(){

    for(var counter = 0;counter<this.arr2Length;counter++){
     
      this.totP += this.cartInfo[counter].Price * this.cartDetails[counter].CartQuantity; //Calculate total price
     }
      
  return this.totP;
  }
  getToday(){
    var today = new Date;
    var dd = today.getDate();
    var mm = today.getMonth() + 1;    // Set dates
    var yyyy = today.getFullYear();
    return dd +  '/' + mm + '/' + yyyy;
  }
  getDeliveryAfter3(){
    var today = new Date;
    var dd = today.getDate() + 3;
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    return dd +  '/' + mm + '/' + yyyy;
  }
  getDeliveryAfter5(){
    var today = new Date;
    var dd = today.getDate() + 5;
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    return dd +  '/' + mm + '/' + yyyy;
  }
   

  
  
  onSubmit() {  // Submit Order Based On Selected Date
   
    this.order = {
      OrderID : 0,
      custID: +localStorage.getItem("custID"),
      OrderDate : '',
      DeliveryDate : '',
      Status:'Not delivered'
    }

    if((document.getElementById('todayDate') as HTMLInputElement).checked){
      this.order = {
        OrderID : 0,
        custID: +localStorage.getItem("custID"),
        OrderDate : this.tDate.todayDate,
        DeliveryDate : this.orderDate.todayDate,
        Status:'Not delivered'
      }
      localStorage.setItem("Status",this.order.Status);
      this.orderService.PostOrder(this.order).subscribe(data=> {
     
        this.orderService.GetOrder().subscribe((data: any) =>{
          this.order = Object.assign({},data.json());
        });
       this.toastr.info('Order Confirmed');
       var btnCont = document.getElementById("btnContinue") as HTMLInputElement;
       btnCont.disabled = false;
 
       var btnConf = document.getElementById("btnConfirm") as HTMLInputElement;
       btnConf.disabled = true;
      })
}else if((document.getElementById('after3') as HTMLInputElement).checked){
  this.order = {
    OrderID : 0,
    custID: +localStorage.getItem("custID"),
    OrderDate : this.tDate.todayDate,
    DeliveryDate : this.orderDate.after3,
    Status:'Not delivered'
  }
  localStorage.setItem("Status",this.order.Status);
        this.orderService.PostOrder(this.order).subscribe(data=> {
       
          this.orderService.GetOrder().subscribe((data: any) =>{
            this.order = Object.assign({},data.json());
          });
         this.toastr.info('Order Confirmed');
         var btnCont = document.getElementById("btnContinue") as HTMLInputElement;
         btnCont.disabled = false;
   
         var btnConf = document.getElementById("btnConfirm") as HTMLInputElement;
         btnConf.disabled = true;
        })
}else if((document.getElementById('after5') as HTMLInputElement).checked){  
  this.order = {
    OrderID : 0,
    custID: +localStorage.getItem("custID"),
    OrderDate : this.tDate.todayDate,
    DeliveryDate : this.orderDate.after5,
    Status:'Not delivered'
  }
   localStorage.setItem("Status",this.order.Status);
    this.orderService.PostOrder(this.order).subscribe(data=> {
      this.orderService.GetOrder().subscribe((data: any) =>{
        this.order = Object.assign({},data.json());
      });
     this.toastr.info('Order Confirmed');
     var btnCont = document.getElementById("btnContinue") as HTMLInputElement;
     btnCont.disabled = false;

     var btnConf = document.getElementById("btnConfirm") as HTMLInputElement;
     btnConf.disabled = true;
    })
  
   
    
}

this.UProduct();  // get update product
}
UProduct(){ // Update Product Quantity After Order Button
  for (var i = 0; i < this.arr1Length; i++){
   
    this.cartQuan += this.cartDetails[i].CartQuantity

    localStorage.setItem("cartQuan",this.cartQuan+'')
    this.productService.getProdList(this.cartDetails[i].ProductID);
    this.productService.prodList.subscribe((pArray:Array<Product>)=>{
      this.prod = pArray;
      if(pArray.length > 0){
       this.arr3Length = pArray.length;

       for (var x = 0; x < this.arr3Length; x++){
        this.totQuan += this.prod[x].Quantity
        this.newPQ = this.totQuan - this.cartQuan;
        localStorage.setItem("newPQ",this.newPQ+'')
        
           
        this.product ={
          ProductID : this.prod[x].ProductID,
          ProdName: this.prod[x].ProdName,
          Quantity: this.newPQ,
          minQuantity:this.prod[x].minQuantity,
          Price: this.prod[x].Price,
          ProdImage: this.prod[x].ProdImage,
         Category: this.prod[x].Category
        }
       
        this.productService.PutProduct(this.prod[x].ProductID,this.product).subscribe((x:any)=>{
    
        })
      }
      
      }
    })
  }
  
  
}

onContinue(){ // Delete Current cart and save it to OrderItems
  
 
  
  this.orderService.GetOrder()
  .subscribe(data => {
   this.order = Object.assign({}, data.json());
   localStorage.setItem("OrderID",this.order.OrderID+'');


  

      for (var i = 0; i < this.arr1Length; i++)
      {
        this.orderItem = {
          OrderItemID : 0,
          OrderID : +localStorage.getItem('OrderID'),
          ProductID : this.cartDetails[i].ProductID,
          custID : +localStorage.getItem('custID'),
          CartQuantity:this.cartDetails[i].CartQuantity
        }
       
       

        this.orderItemService.PostOrderItem(this.orderItem)
        .subscribe(data => {       
        })
     
        this.orderItemService.DeleteOrderItem(this.cartDetails[i].CartID)
        .subscribe(data => {
          location.reload();
  
        })
             
      }
     
      
      
    this.router.navigate(['/orderItemDetails']);
  })

    

}




}

    
  

  