import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Admin } from './admin.model';

@Injectable()
export class AdminService {
  readonly rootUrl = 'http://localhost:50741/';
  selectedAdmin : Admin;
  adminList: Admin[]
  constructor(private http : Http, private httpClient : HttpClient) { }


  GetAdminClaims(){
    return this.httpClient.get(this.rootUrl+'api/GetAdminClaims',
        {headers: new HttpHeaders({'Authorization': 'Bearer '+localStorage.getItem('token')})});
  }

  PostAdmin(adm : Admin){
    var body = JSON.stringify(adm);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.rootUrl +'api/Admin',body,requestOptions).map(x => x.json());
  }
  PutAdmin(id, adm){
    var body = JSON.stringify(adm);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Put,headers:headerOptions});
    return this.http.put(this.rootUrl +'api/Admin/'+id,body,requestOptions).map(responseObservable => responseObservable.json());
  }
  DeleteAdmin(id: number){
    return this.http.delete(this.rootUrl +'api/Admin/'+id).map(res=>res.json());
  }

  getAdminList(){
    this.http.get(this.rootUrl+'api/Admin').map((data:Response)=>{
      return data.json() as Admin[];
    }).toPromise().then(x=>{
      this.adminList = x;
    })
  }

}
