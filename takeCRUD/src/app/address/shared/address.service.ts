import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Address } from './address.model';

@Injectable()
export class AddressService {
  readonly rootUrl = 'http://localhost:50741/';
  address : Address;
  selectedAddress : Address;
  addressList : Address[];

  constructor(private http : Http, private httpClient : HttpClient) { }


  PostAddress(addr : Address){
    var body = JSON.stringify(addr);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.rootUrl +'api/Address',body,requestOptions).map(x => x.json());
  }
  PutAddress(id, addr){
    var body = JSON.stringify(addr);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions});
    return this.http.put(this.rootUrl +'api/Address/'+id,body,requestOptions).map(responseObservable => responseObservable.json());
  }
  DeleteAddress(id: number){
    return this.http.delete(this.rootUrl +'api/Address/'+id).map(res=>res.json());
  }
  getAddressList(){
    return this.http.get(this.rootUrl+'api/GetAddress?id='+localStorage.getItem("custID"));
  }
  getAddress(){
    return this.http.get(this.rootUrl+'api/GetAddresses?id='+localStorage.getItem("custID"));
  }
 
  getAddressByID(id){
    this.http.get(this.rootUrl+'api/GetAddresses?id='+id).map((data:Response)=>{
      return data.json() as Address[];
    }).toPromise().then(x=>{
      this.addressList = x;
    })
  }

}
