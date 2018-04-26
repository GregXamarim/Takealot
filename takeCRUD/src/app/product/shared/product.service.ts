import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProductService {

  product : Product;
  selectedProduct : Product;
  productList : Product[];
  prodList: Subject<Array<Product>> = new BehaviorSubject<Array<Product>>([])


  readonly rootUrl = 'http://localhost:50741/';

  constructor(private http : Http, private httpClient : HttpClient) { }


  PostProduct(product : Product) {
    var body = JSON.stringify(product);
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOption });
    return this.http.post(this.rootUrl + 'api/Product', body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  PutProduct(id, product) {
    var body = JSON.stringify(product);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(this.rootUrl + 'api/Product/' + id, body, requestOptions)
      .map(responseObservable => responseObservable.json());
  }

  DeleteProduct(id : number) {
    return this.http.delete(this.rootUrl + 'api/Product/' + id).map(res => res.json());
  }

  getProductList() {
    this.http.get(this.rootUrl + 'api/Product').map((data : Response) => {
      return data.json() as Product[];
    }).toPromise().then(x => {
      this.productList = x;
    })
  }
  getProdByID(id: number){
   return this.http.get(this.rootUrl +'api/Product?id='+ id)
  }
  getProdList(id:number){
    this.http.get(this.rootUrl+'api/GetProduct?id='+id).map((res:any)=>{
      return res.json();
    }).subscribe((data: any) =>{
      this.prodList.next(data);
    })
  }
 
}