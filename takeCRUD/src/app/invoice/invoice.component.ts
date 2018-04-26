import { Component, OnInit } from '@angular/core';
import { Driver } from '../driver/shared/driver.model';
import { OrderItemInfo } from '../order/shared/order-item-info.model';
import { Order } from '../order/shared/order.model';
import { AddressService } from '../address/shared/address.service';
import { OrderService } from '../order/shared/order.service';
import { OrderItemService } from '../order/shared/order-item.service';
import { Router } from '@angular/router';
import { AdminService } from '../admin/shared/admin.service';
import { DriverService } from '../driver/shared/driver.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../users/shared/customer.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers:[OrderItemService,OrderService,CustomerService]
})
export class InvoiceComponent implements OnInit {

  userClaims: any;
  selectedDriver: Driver;
  details:Array<OrderItemInfo> = [];
  orderID : number;
  orderI: Array<Order> = [];
  adminClaims: any;
  delivered: boolean;
  arrayLength: number;
  totalP : string;
  order: Order




  constructor(private customerService : CustomerService,private orderService: OrderService,private orderItemService: OrderItemService,private router: Router,private toastr : ToastrService) { }

  ngOnInit() {
    this.orderService.getOrderList();
   
    this.customerService.GetUserClaims().subscribe((data: any)=>{
      this.userClaims = data;
     
    });
   

    this.orderService.getOrderList();
    this.orderService.orderList.subscribe((oIDArray : Array<Order>) => {
  this.orderI = oIDArray
    })
    this.totalP = localStorage.getItem("totalP")
    this.orderItemService.getOrderItemListInfo(+localStorage.getItem("OrderID"));
    this.orderItemService.orderItemInfoList
    .subscribe((oIDArray : Array<OrderItemInfo>) => {
      this.details = oIDArray;

    })

  }
  Print(){
    window.print();
  }
  Logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
