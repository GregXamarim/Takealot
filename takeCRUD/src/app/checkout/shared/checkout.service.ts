import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Checkout } from './checkout.model';

@Injectable()
export class CheckoutService {
  readonly rootUrl = 'http://localhost:50741/';
  payment : Checkout;
  selectedPayment : Checkout;

  constructor(private http : Http, private httpClient : HttpClient) { }


  PostPayment(pay : Checkout){
    var body = JSON.stringify(pay);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.rootUrl +'api/Payment',body,requestOptions).map(x => x.json());
  }
  PutPayment(id, pay){
    var body = JSON.stringify(pay);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions});
    return this.http.put(this.rootUrl +'api/Payment?id='+id,body,requestOptions).map(responseObservable => responseObservable.json());
  }

  getPaymentList(){
    return this.http.get(this.rootUrl+'api/GetPayment?id='+localStorage.getItem("custID"));
  }


}
