import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { OrderItem } from './order-item.model';
import { Order } from './order.model';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { OrderItemInfo } from './order-item-info.model';


@Injectable()
export class OrderItemService {
  orderItemList: Subject<Array<OrderItem>> = new BehaviorSubject<Array<OrderItem>>([])
  orderItemInfoList: Subject<Array<OrderItemInfo>> = new BehaviorSubject<Array<OrderItemInfo>>([])
  readonly rootUrl = 'http://localhost:50741/';
  CartQuantity:any;
  Price:any;

  constructor(private http : Http, private httpClient : HttpClient) { }


  PostOrderItem(ord : OrderItem){
    var body = JSON.stringify(ord);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.rootUrl +'api/OrderItem',body,requestOptions).map(x => x.json());
  }
  DeleteOrderItem(id: number){
    return this.http.delete(this.rootUrl +'api/Cart/'+id).map(res=>res.json());
  }
  GetOrderItem(){
    return this.http.get(this.rootUrl+'api/OrderItem?id='+localStorage.getItem("custID"))
    
  }
  GetOrderItemByID(id:number){
    return this.http.get(this.rootUrl+id)
    
  }
  getOrderItemList() {
    this.http.get(this.rootUrl + 'api/OrderItem?id='+localStorage.getItem("custID"))
    .map((res: any)=>{
      return res.json();
    }).subscribe((data: any)=>{
      this.orderItemList.next(data);
    })
  }
  getOrderItemListInfo(id:number) {
    this.http.get(this.rootUrl + 'api/OrderItem?id='+id)
    .map((res: any)=>{
      return res.json();
    }).subscribe((data: any)=>{
      this.orderItemInfoList.next(data);
    })
  }


  
}
