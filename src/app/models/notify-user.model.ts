import {Deserializable} from "./deserializable.model";

export class NotifyUserModel implements Deserializable {
    firstName:string;
    lastName:string;
    emailID:string;
    departmentID:number;
    companyID:number;
    constructor(){
        this.emailID="";
        this.firstName="";
        this.lastName="";
        this.departmentID=0;
        this.companyID=0;
    }
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }
}