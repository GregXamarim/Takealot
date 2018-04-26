import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../users/shared/customer.service';
import { CartService } from '../../cart/shared/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CartInfoService } from '../../cart/shared/cart-info.service';
import { ProductService } from '../../product/shared/product.service';
import { CheckoutService } from '../../checkout/shared/checkout.service';
import { OrderService } from '../shared/order.service';
import { OrderItemService } from '../shared/order-item.service';
import { Order } from '../shared/order.model';
import { AddressService } from '../../address/shared/address.service';
import { Cart } from '../../cart/shared/cart.model';
import { CartInfo } from '../../cart/shared/cart-info.model';
import { OrderItem } from '../shared/order-item.model';
import { Product } from '../../product/shared/product.model';
import { OrderItemInfo } from '../shared/order-item-info.model';
import { Address } from '../../address/shared/address.model';
import { CheckboxRequiredValidator } from '@angular/forms';
import { Checkout } from '../../checkout/shared/checkout.model';

@Component({
  selector: 'app-order-item-details',
  templateUrl: './order-item-details.component.html',
  styleUrls: ['./order-item-details.component.css'],
  providers:[CustomerService,CartService,OrderService,AddressService,CheckoutService,CartInfoService,ProductService,OrderItemService]

})
export class OrderItemDetailsComponent implements OnInit {
  order: Order;
  selectedOrder: any;
  totP : number = 0;
  totQ : number = 0;
  totalQuantity: number;
  totalP : number;
  cartDetails: Array<OrderItem> = [];
  arr1Length: number;
  arr2Length: number;
  orderItemInfo: Array<OrderItemInfo> = [];
  userClaims: any;
  orderDate: any;
  tDate: any;
  orderItem: OrderItem;
  product: Product[]
  address: Address;
  payment:Checkout;
  id:number;

  //Address
  addressID : number
  recipientName : string;
  contactNum :string
  addressType :string
  standNo :string
  streetAddress :string
  suburb: string
  city: string
  postalCode:string
 
  // Payment
  paymentType: string;

  // Date
  deliveryDate: string;

  constructor(private addressService : AddressService,private router: Router,private customerService: CustomerService,private cartService : CartService,private toastr : ToastrService,private cartInfoService : CartInfoService,private productService : ProductService,private paymentService:CheckoutService,private orderService: OrderService,private orderItemService: OrderItemService) { }

  ngOnInit() {
    this.orderItemService.getOrderItemListInfo(+localStorage.getItem("OrderID"))
    this.orderItemService.orderItemInfoList.subscribe((cartArray:Array<OrderItemInfo>)=>{
      this.orderItemInfo = cartArray;
      if(cartArray.length > 0){
       this.arr2Length = cartArray.length;
       
      
        this.totalP = this.totalPrice();
        console.log(this.totalP)
        
       
      }
      
    })
  this.orderItemService.getOrderItemList();
  this.orderItemService.GetOrderItem().subscribe(data=>{
    this.orderItem = Object.assign({},data.json());
  });
  
 
  
  
  this.addressService.getAddress().subscribe((data: any) =>{
    this.addressService.selectedAddress = Object.assign({},data.json());

    this.addressID = this.addressService.selectedAddress[0].AddressID;
    this.recipientName = this.addressService.selectedAddress[0].RecipientName;
    this.contactNum = this.addressService.selectedAddress[0].ContactNum;
    this.addressType = this.addressService.selectedAddress[0].AddressType;
    this.standNo = this.addressService.selectedAddress[0].StandNo;
    this.streetAddress = this.addressService.selectedAddress[0].StreetAddress;
    this.suburb = this.addressService.selectedAddress[0].Suburb;
    this.city = this.addressService.selectedAddress[0].City;
    this.postalCode = this.addressService.selectedAddress[0].PostalCode;
  
  });
 
  this.paymentService.getPaymentList().subscribe((data:any)=>{
    this.payment =  Object.assign({},data.json());
  this.paymentType = this.payment.PaymentType;
  });


  this.orderService.GetOrder().subscribe((data:any)=>{
    this.order =  Object.assign({},data.json());
    this.id = this.order.OrderID;
  this.deliveryDate = this.order.DeliveryDate;
  });


 
  this.customerService.GetUserClaims().subscribe((data: any)=>{
   this.userClaims = data;
  
 });


}






  totalPrice(){
    
    for (var i = 0; i < this.arr2Length; i++){
      this.totP +=  this.orderItemInfo[i].Price * this.orderItemInfo[i].CartQuantity;
    }
    //console.log(this.totP);
    return this.totP;
   
   }

  

}
