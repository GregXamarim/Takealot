import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class OrderService {
  readonly rootUrl = 'http://localhost:50741/';
  order : Order;
  selectedOrder : Order;
  orderList: Subject<Array<Order>> = new BehaviorSubject<Array<Order>>([])


  constructor(private http : Http, private httpClient : HttpClient) { }


  PostOrder(ord : Order){
    var body = JSON.stringify(ord);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.rootUrl +'api/Order',body,requestOptions).map(x => x.json());
  }
  PutOrder(id, ord){
    var body = JSON.stringify(ord);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions});
    return this.http.put(this.rootUrl +'api/Order/'+id,body,requestOptions).map(responseObservable => responseObservable.json());
  }
  

  GetOrder(){
    return this.http.get(this.rootUrl+'api/GetOrder?id='+localStorage.getItem("custID"));
  }
  getOrderList(){
    this.http.get(this.rootUrl+'api/Order?id='+localStorage.getItem("custID")).map((res:any)=>{
      return res.json();
    }).subscribe((data: any) =>{
      this.orderList.next(data);
    })
  }

 
}
