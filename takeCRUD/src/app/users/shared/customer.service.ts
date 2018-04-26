import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';


import {Customer} from './customer.model';



@Injectable()
export class CustomerService {
  readonly rootUrl = 'http://localhost:50741/';
  customerList : Customer[];
  selectedCustomer : Customer;
  constructor(private http : Http, private httpClient : HttpClient) { }
  
   postcustomer(cust : Customer){
    var body = JSON.stringify(cust);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.rootUrl +'/api/customer',body,requestOptions).map(x => x.json());
  }

userAuthentication(Email,Password){
  var data = "username="+Email+"&password="+Password+"&grant_type=password";
  var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-urlencoded'});
  return this.httpClient.post(this.rootUrl+'token',data,{headers: reqHeader});
}

Putcustomer(id, cust){
  var body = JSON.stringify(cust);
  var headerOptions = new Headers({'Content-Type' : 'application/json'});
  var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions});
  return this.http.put(this.rootUrl +'api/customer/'+id,body,requestOptions).map(responseObservable => responseObservable.json());
}

GetUserClaims()
{
 return this.httpClient.get(this.rootUrl+'api/GetUserClaims',
      {headers: new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token')})});
}




}
