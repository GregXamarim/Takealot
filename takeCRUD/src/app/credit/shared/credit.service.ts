import { Injectable } from '@angular/core';
import { Credit } from './credit.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class CreditService {

  readonly rootUrl = 'http://localhost:50741/';
  credit : Credit;
  selectedCredit : Credit;

  constructor(private http : Http, private httpClient : HttpClient) { }


  PostCredit(credit : Credit){
    var body = JSON.stringify(credit);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.rootUrl +'api/Credit',body,requestOptions).map(x => x.json());
  }
  PutCredit(id, credit){
    var body = JSON.stringify(credit);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions});
    return this.http.put(this.rootUrl +'api/Credit/'+id,body,requestOptions).map(responseObservable => responseObservable.json());
  }
 
  GetCredit(){
    return this.http.get(this.rootUrl+'api/GetCredit?id='+localStorage.getItem("PaymentID"));
  }

}
