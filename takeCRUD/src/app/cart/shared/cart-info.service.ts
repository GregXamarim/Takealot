import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CartInfo } from './cart-info.model';

@Injectable()
export class CartInfoService {

 
 
  
 // cartList : Cart[];
 cartListInfo: Subject<Array<CartInfo>> = new BehaviorSubject<Array<CartInfo>>([])

  readonly rootUrl = 'http://localhost:50741/';

  constructor(private http : Http, private httpClient : HttpClient) { }



  getCartInfoList() {
    this.http.get(this.rootUrl + 'api/Cart?id='+localStorage.getItem("custID"))
    .map((res: any)=>{
      return res.json();
    }).subscribe((data: any)=>{
      this.cartListInfo.next(data);
    })
  }

}
