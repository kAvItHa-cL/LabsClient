import {Deserializable} from "./deserializable.model";

export class UserModel implements Deserializable {
    iD:number;
    departmentID:number;
    companyID:number;
    firstName:string;
    lastName:string;
    emailID:string;
    gender:string;
    isActive:boolean;
    createdBy:number;
    createdDate:Date;
    modifiedBy:number;
    modifiedDate:Date;
    password:string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}