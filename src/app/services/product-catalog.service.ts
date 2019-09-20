import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductCatalogService {
  constructor(private http: Http) {}
  apiUrl:string = "http://localhost:60704"
  
  getProductCategoryList() {
    return this.http.get(this.apiUrl+"/api/ProductCatalog/GetProductCategoryList")
    .map((response: Response) => response.json()); 
  }

  getProductCatalogList(categoryID){
    return this.http.get(this.apiUrl+"/api/ProductCatalog/GetProductCatalogList/"+categoryID)
    .map((response: Response) => response.json()); 
  }
  getProductContentList(productID){
    return this.http.get(this.apiUrl+"/api/ProductCatalog/GetProductCatalog/"+productID)
    .map((response: Response) => response.json()); 
  }
}
