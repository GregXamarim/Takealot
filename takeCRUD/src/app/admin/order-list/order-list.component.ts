import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order/shared/order.service';
import { OrderItemService } from '../../order/shared/order-item.service';
import { Order } from '../../order/shared/order.model';
import { Router } from '@angular/router';
import { AdminService } from '../shared/admin.service';
import { OrderItemInfo } from '../../order/shared/order-item-info.model';
import { NgForm } from '@angular/forms';
import { SupplierService } from '../../supplier/shared/supplier.service';
import { DriverService } from '../../driver/shared/driver.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers:[OrderService,OrderItemService,AdminService,DriverService,SupplierService]
})
export class OrderListComponent implements OnInit {
  deliveryDate: string;
  orderDate: string;
  order: Order;
  custID: number;
  orderID: number;
  adminClaims : any;
  orderI: Array<Order> = [];
  totP : number = 0;
  totQ : number = 0;
  arr2Length: number;
  totalP : string;
  details:Array<OrderItemInfo> = [];
  pName : string;
  pQuantity : number;
  Status:string;


  constructor(private driverService : DriverService,private supplierService : SupplierService,private adminService : AdminService,private router: Router,private orderService: OrderService,private orderItemService: OrderItemService) { }

  ngOnInit() {
    this.adminService.GetAdminClaims().subscribe((data: any)=>{
      this.adminClaims = data;
    });
   this.Status = localStorage.getItem("Status")
    this.driverService.getDriverList();
    this.supplierService.getSupplierList();
    this.totalP = localStorage.getItem("totalP")
   this.orderService.getOrderList();
   this.orderService.orderList.subscribe((oIDArray : Array<Order>) => {
   this.orderI = oIDArray
  })
  

  }
  
  Logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  onSubmit(id: number){

   
    this.orderItemService.getOrderItemListInfo(id);
    this.orderItemService.orderItemInfoList
    .subscribe((oIDArray : Array<OrderItemInfo>) => {
      this.details = oIDArray;

    })

  }

}
