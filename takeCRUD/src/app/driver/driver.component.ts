import { Component, OnInit } from '@angular/core';
import { DriverService } from './shared/driver.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin/shared/admin.service';
import { Driver } from './shared/driver.model';
import { OrderItemService } from '../order/shared/order-item.service';
import { OrderItemInfo } from '../order/shared/order-item-info.model';
import { OrderService } from '../order/shared/order.service';
import { NgForm } from '@angular/forms';
import { Order } from '../order/shared/order.model';
import { AddressService } from '../address/shared/address.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
  providers:[AdminService,DriverService,OrderItemService,OrderService,AddressService]
})
export class DriverComponent implements OnInit {
  DriverClaims: any;
  selectedDriver: Driver;
  details:Array<OrderItemInfo> = [];
  orderID : number;
  orderI: Array<Order> = [];
  adminClaims: any;
  delivered: boolean;
  arrayLength: number;
  totalP : string;



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

  constructor(private addressService : AddressService,private orderService: OrderService,private orderItemService: OrderItemService,private router: Router,private adminService : AdminService,private driverService : DriverService,private toastr : ToastrService) { }

  ngOnInit() {
    this.orderService.getOrderList();
    this.driverService.GetAdminClaims().subscribe((data: any)=>{
      this.DriverClaims = data;
    });
    
    this.totalP = localStorage.getItem("totalP")

    this.orderService.getOrderList();
    this.orderService.orderList.subscribe((oIDArray : Array<Order>) => {
  this.orderI = oIDArray
    })

  
  }
 
  onSubmit(order: Order){

   this.addressService.getAddressByID(order.custID);
   console.log(this.addressService.addressList);
    this.orderItemService.getOrderItemListInfo(order.OrderID);
    this.orderItemService.orderItemInfoList
    .subscribe((oIDArray : Array<OrderItemInfo>) => {
      this.details = oIDArray;

    })

  }
  Logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  UpdateStatus(order: Order){
    order.Status = "Delivered";
    this.orderService.PutOrder(order.OrderID,order).subscribe(x=>{
      this.orderService.getOrderList();
      location.reload();
    })
   
   
   
  }

  Status(order: Order){
  
      if(order.Status == "Delivered"){
        this.delivered = true
      }else{
        this.delivered = false
      }
     
    return this.delivered;

  }
Print(){
  window.print();
}
}
