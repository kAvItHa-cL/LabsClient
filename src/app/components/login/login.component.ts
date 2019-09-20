import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FlashMessagesService} from 'ngx-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  objUserModel : UserModel;
  formLogin:FormGroup;
  constructor(private _loginService:LoginService, private _router:Router,private flashMessagesService: FlashMessagesService) {
    this.objUserModel = new UserModel();
   }

  ngOnInit() {
    this.formLogin = new FormGroup({
      emailID: new FormControl("", Validators.compose([
        Validators.required,Validators.email
     ])),
      password: new FormControl("", Validators.compose([
        Validators.required
     ]))
    });
  }

  submitLoginDetails(data)
  {
    if(data.emailID==""){
      this.flashMessagesService.show(document.getElementById("EnterEmailId").innerHTML, {
        classes: ['alert', 'alert-danger']
      });
      return;
    }
    if(data.password==""){
      this.flashMessagesService.show(document.getElementById("EnterPassword").innerHTML, {
        classes: ['alert', 'alert-danger']
      });
      return;
    }
    this.objUserModel.deserialize(data);
    this._loginService.postLoginDetails(data)
    .subscribe(
      data => {
        if(data>0)
        {
          this._router.navigate(['/product-category']);
        }
        else{
          this._router.navigate(['/login']);
          this.flashMessagesService.show(document.getElementById("InvalidUser").innerHTML, {
            classes: ['alert', 'alert-danger']
          });
        }
      }) ;

    }

}
