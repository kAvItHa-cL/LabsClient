import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { UserModel } from '../models/user.model';

@Injectable()
export class LoginService {

  constructor(private http: Http) {}

  userUrl:string = "http://localhost:60705"


  postLoginDetails(objUserDetails)
  {

    return this.http.post(this.userUrl+"/api/UserAccess/ValidateUser",objUserDetails)
    .map((response: Response) => response.json());

  }

}
