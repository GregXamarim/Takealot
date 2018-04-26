import { Injectable } from '@angular/core';
import { Eft } from './eft.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class EftService {

  readonly rootUrl = 'http://localhost:50741/';
  eft : Eft;
  selectedeft : Eft;
  eftList : Eft[];

  constructor(private http : Http, private httpClient : HttpClient) { }


  PostEFT(eft : Eft){
    var body = JSON.stringify(eft);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.rootUrl +'api/EFT',body,requestOptions).map(x => x.json());
  }
  PutEFT(id, eft){
    var body = JSON.stringify(eft);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions});
    return this.http.put(this.rootUrl +'api/EFT/'+id,body,requestOptions).map(responseObservable => responseObservable.json());
  }
 
  GetEFT(){
    return this.http.get(this.rootUrl+'api/GetEFT?id='+localStorage.getItem("PaymentID"));
  }
}
