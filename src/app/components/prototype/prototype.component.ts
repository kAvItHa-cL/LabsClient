import { Component, OnInit } from '@angular/core';
import { PrototypeService } from '../../services/prototype.service';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { DocumentModel } from '../../models/document.model';
import { DocumentTypeModel } from '../../models/document-type.model';
import { ProductModel } from '../../models/product.model';
import { RequestModel } from '../../models/request.model';
import { PrototypeModel } from '../../models/prototype.model';
import { UserModel } from '../../models/user.model';
import { NotifyUserModel } from '../../models/notify-user.model';
import { Router } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { FileExtensionModel } from '../../models/file-extension.model';
import { FlashMessagesService } from 'ngx-flash-messages';
@Component({
  selector: 'app-prototype',
  templateUrl: './prototype.component.html',
  styleUrls: ['./prototype.component.css']
})
export class PrototypeComponent implements OnInit {
  resources: string[];
  objDocumentTypeList: DocumentTypeModel[];
  objProductList: ProductModel[];
  objUserModelList: UserModel[];
  objRequestModel: RequestModel;
  objPrototypeModel: PrototypeModel;
  
  objDocumentModel:DocumentModel;
  objApprovedDocumentModel:DocumentModel;
  objDocumentModelList: Array<DocumentModel>=[];
  objApprovedDocumentModelList: Array<DocumentModel>=[];
  objNotifyUserModel:NotifyUserModel;
  objNotifyUserModelList: Array<NotifyUserModel>=[];

  fromDate:Date;
  toDate:Date;
  blockedDates:any;
  startDate:Date;
  endDate:Date;
  formPrototypeDetails:FormGroup;
  constructor(private _prototypeService:PrototypeService,private _router:Router,private flashMessagesService: FlashMessagesService) {
    this._prototypeService.getProductList().subscribe(data =>this.objProductList=data);
    this._prototypeService.getDocumentList().subscribe(data =>this.objDocumentTypeList=data);
    this._prototypeService.getUserList().subscribe(data =>this.objUserModelList=data);
    this._prototypeService.getScheduledDateList().subscribe(data=>this.blockedDates=data);
    this.objRequestModel=new RequestModel();
    this.objPrototypeModel = new PrototypeModel();
    this.objPrototypeModel.request = this.objRequestModel;

    this.objDocumentModel = new DocumentModel();
    this.objDocumentModelList.push(this.objDocumentModel);
    this.objApprovedDocumentModel = new DocumentModel();
    this.objApprovedDocumentModelList.push(this.objApprovedDocumentModel);

    this.objNotifyUserModel = new NotifyUserModel();
    this.objNotifyUserModelList.push(this.objNotifyUserModel);
    
  }
  ngOnInit() {
    this.formPrototypeDetails = new FormGroup({
      productID: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9][0-9]*")
     ])),
      quantity: new FormControl("", Validators.compose([
        Validators.min(1),
        Validators.required,
        Validators.pattern("^[1-9][0-9]*")
     ])),
      description: new FormControl("", Validators.compose([
        Validators.required
     ])),
     specialInstruction: new FormControl(),
     scheduledStartDate: new FormControl(),
     scheduledEndDate: new FormControl()
    });
  }
  
  submitPrototypeDetails(data){
   
    this.objRequestModel.deserialize(data);
    this.objRequestModel.requestTypeID = 1;
    this.objRequestModel.statusID = 1;
    this.objRequestModel.scheduledStartDate = this.startDate;
    this.objRequestModel.scheduledEndDate = this.endDate;
    this.objPrototypeModel.documentList=this.objDocumentModelList;
    this.objPrototypeModel.approvedDocumentList=this.objApprovedDocumentModelList;
    this.objPrototypeModel.notifyUserList=this.objNotifyUserModelList;
    if(this.objRequestModel.productID==0 )
    {
      window.scroll(0,0);
      this.flashMessagesService.show(document.getElementById("SelectProduct").innerHTML, {
        classes: ['alert', 'alert-danger']
      });
    }
    else if(this.objRequestModel.quantity<=0)
    {
      window.scroll(0,0);
      this.flashMessagesService.show(document.getElementById("EnterQuantity").innerHTML, {
        classes: ['alert', 'alert-danger']
      });
    }
    else if(this.objRequestModel.description=="")
    {
      window.scroll(0,0);
      this.flashMessagesService.show(document.getElementById("EnterProductDescription").innerHTML, {
        classes: ['alert', 'alert-danger']
      }); 
    }
    else if(this.objNotifyUserModelList[0].firstName=="" || this.objNotifyUserModelList[0].firstName==undefined)
    {
      window.scroll(0,0);
      this.flashMessagesService.show(document.getElementById("SelectNotifier").innerHTML, {
        classes: ['alert', 'alert-danger']
      });     
    }
    else{
      if(!this.formPrototypeDetails.valid)
      {window.scroll(0,0);
        this.flashMessagesService.show(document.getElementById("EnterProperValues").innerHTML, {
          classes: ['alert', 'alert-danger']
        });   
      }
      else
        this._prototypeService.postPrototypeDetails(this.objPrototypeModel)
        .subscribe((data) => {
          window.scroll(0,0);
            this.flashMessagesService.show(document.getElementById("RequestRaised").innerHTML, {
              classes: ['alert', 'alert-success']
            });      
        }, (err) => {        
        }
      );
    }
  }
 
  attachFile(event,index) {    
    if (event.target.files.length === 0)
      return;
    
    for (let file of event.target.files)
     { 
        let objFileExtensionModel = new FileExtensionModel();
        if(objFileExtensionModel.prototypeRequiredFileExtensions.indexOf(file.name.substr(file.name.lastIndexOf(".")))==-1){
          window.scroll(0,0);
          this.flashMessagesService.show(document.getElementById("InvalidFileExtension").innerHTML, {
            classes: ['alert', 'alert-danger']
          });  
          return;
        }             
        this.objDocumentModelList[index].uploadStatus=document.getElementById("InProgress").innerHTML;
        this.objDocumentModelList[index].description=file.name;
        this.objDocumentModelList[index].fileType = file.type;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        setTimeout(() => {
          while(reader.result==""){
          }
          this.objDocumentModelList[index].blobValue = reader.result.split(',')[1];
          this.objDocumentModelList[index].uploadStatus=document.getElementById("Completed").innerHTML;
        }, 1000);
      }
    }
    attachApprovedFile(event,index) {    
 
      if (event.target.files.length === 0)
        return;
      
      for (let file of event.target.files)
       {
          let objFileExtensionModel = new FileExtensionModel();
          if(objFileExtensionModel.prototypeApprovedFileExtensions.indexOf(file.name.substr(file.name.lastIndexOf(".")))==-1){
            window.scroll(0,0);
            this.flashMessagesService.show(document.getElementById("InvalidFileExtension").innerHTML, {
              classes: ['alert', 'alert-danger']
            });  
            return;
          }     
          this.objApprovedDocumentModelList[index].uploadStatus=document.getElementById("InProgress").innerHTML;
          this.objApprovedDocumentModelList[index].description=file.name;
          this.objApprovedDocumentModelList[index].fileType = file.type;
          let reader = new FileReader();
          reader.readAsDataURL(file);
          setTimeout(() => {
            while(reader.result==""){
            }
            this.objApprovedDocumentModelList[index].blobValue = reader.result.split(',')[1];
            this.objApprovedDocumentModelList[index].uploadStatus=document.getElementById("Completed").innerHTML;
          }, 1000);
        }
      }

    addFileUploadRow(currentIndex) {
      if(this.objDocumentModelList[currentIndex].description!=undefined 
      && this.objDocumentModelList[currentIndex].description!="")
      {
        if(this.objDocumentModelList.length==currentIndex+1)
        {
          this.objDocumentModel = new DocumentModel();
          this.objDocumentModelList.push(this.objDocumentModel);
        }
      }     
    }

    addApprovedFileUploadRow(currentIndex) {
      if(this.objApprovedDocumentModelList[currentIndex].description!=undefined 
        && this.objApprovedDocumentModelList[currentIndex].description!="")
      {
        if(this.objApprovedDocumentModelList.length==currentIndex+1)
        {
          this.objApprovedDocumentModel = new DocumentModel();
          this.objApprovedDocumentModelList.push(this.objApprovedDocumentModel);
        }
      }     
    }

    deleteFileUploadRow(index) {
        if(index==0 && this.objDocumentModelList.length==1){   
          this.objDocumentModelList.splice(index, 1);
          this.objDocumentModel = new DocumentModel();
          this.objDocumentModelList.push(this.objDocumentModel);
        }
        else
        this.objDocumentModelList.splice(index, 1);
    }
    deleteApprovedFileUploadRow(index) {
      if(index==0 && this.objApprovedDocumentModelList.length==1){
        this.objApprovedDocumentModelList.splice(index, 1);
        this.objApprovedDocumentModel = new DocumentModel();
        this.objApprovedDocumentModelList.push(this.objApprovedDocumentModel);           
      }
      else
      this.objApprovedDocumentModelList.splice(index, 1);
  }

    selectDocumentCategory(event,i){
      this.objDocumentModelList[i].documentTypeID = event.target.value;
    }

    addNotifyUserRow(currentIndex) {
      if(this.objNotifyUserModelList[currentIndex].firstName!=undefined 
        && this.objNotifyUserModelList[currentIndex].firstName!="")
      {
        if(this.objNotifyUserModelList.length==currentIndex+1)
        {
          this.objNotifyUserModel = new NotifyUserModel();
          this.objNotifyUserModelList.push(this.objNotifyUserModel);
        }
      }
    }

    deleteNotifyUserRow(index) {
        if(index==0 && this.objNotifyUserModelList.length==1){
          this.objNotifyUserModelList[index].emailID="";
          this.objNotifyUserModelList[index].firstName="";
          this.objNotifyUserModelList[index].lastName="";      
        }
        else
          this.objNotifyUserModelList.splice(index, 1);
    }
    matchFound:boolean;
    searchUserByEmail(event,index){ 
      this.matchFound=false;
      this.objNotifyUserModelList.forEach(element =>{
        if(element.emailID==event.target.value && index!=this.objNotifyUserModelList.indexOf(element)){
          window.scroll(0,0);
            this.flashMessagesService.show(document.getElementById("EmailExists").innerHTML, {
              classes: ['alert', 'alert-danger']
            }); 
          this.matchFound=true;
          return;
        }
      });
      this.objUserModelList.forEach(element => {        
        if(element.emailID==event.target.value && this.matchFound!=true){
          this.matchFound=true;
          this.objNotifyUserModelList[index].emailID = element.emailID;
          this.objNotifyUserModelList[index].firstName = element.firstName;
          this.objNotifyUserModelList[index].lastName = element.lastName;
          this.objNotifyUserModelList[index].departmentID = element.departmentID;
          this.objNotifyUserModelList[index].companyID = element.companyID;
          return;
        }
      });
      if(this.matchFound==false)
      {        
        this.objNotifyUserModelList[index].emailID = "";
        this.objNotifyUserModelList[index].firstName = "";
        this.objNotifyUserModelList[index].lastName = "";
        window.scroll(0,0);
            this.flashMessagesService.show(document.getElementById("InvalidEmail").innerHTML, {
              classes: ['alert', 'alert-danger']
            }); 
      }
    }
    setScheduledStartDate(event){
      this.startDate = event.target.value;
      this.fromDate=event.target.value;
    }
    setScheduledEndDate(event){
      this.endDate = event.target.value;
      this.toDate=event.target.value;      
    }
}
