import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PrototypeService {
  constructor(private http: Http) {}
  apiUrl:string = "http://localhost:60704"
  userUrl:string = "http://localhost:60705"
  
    getProductList() {
    return this.http.get(this.apiUrl+"/api/Prototype/GetProductList")
    .map((response: Response) => response.json()); 
    }

    getDocumentList() {
        return this.http.get(this.apiUrl+"/api/Prototype/GetDocumentTypeList")
        .map((response: Response) => response.json()); 
    }

    postPrototypeDetails(objPrototypeModel) {
       
        return this.http.post(this.apiUrl+"/api/Prototype/AddPrototypeDetails",objPrototypeModel)
        .map((response: Response) => response.json()); 
    }

    getUserList() {
        return this.http.get(this.userUrl+"/api/UserAccess/GetUserList")
        .map((response: Response) => response.json()); 
    }
    getScheduledDateList() {
        return this.http.get(this.apiUrl+"/api/Prototype/GetScheduledDateList")
        .map((response: Response) => response.json() ); 
       
        }
}
