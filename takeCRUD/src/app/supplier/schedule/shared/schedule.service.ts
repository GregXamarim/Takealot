import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Schedule } from './schedule.model';

@Injectable()
export class ScheduleService {
  readonly rootUrl =  'http://localhost:50741/';
  selectedSchedule : Schedule;
  SupplierList: Schedule[]
  constructor(private http : Http, private httpClient : HttpClient) { }
  
  PostSchedule(sup : Schedule){
    var body = JSON.stringify(sup);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.rootUrl +'api/Schedule',body,requestOptions).map(x => x.json());
  }
  DeleteSchedule(id : number) {
    return this.http.delete(this.rootUrl + 'api/Schedule/' + id).map(res => res.json());
  }
  getScheduletList() {
    this.http.get(this.rootUrl + 'api/Schedule').map((data : Response) => {
      return data.json() as Schedule[];
    }).toPromise().then(x => {
      this.SupplierList = x;
    })
  }
}
