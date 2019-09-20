import {Deserializable} from "./deserializable.model";

export class RequestModel implements Deserializable {
    iD:number;
    productID:number;
    requestTypeID:number;
    statusID:number;
    approverWorkFlowID:number;
    description: string;
    specialInstruction: string;
    scheduledStartDate:Date;
    scheduledEndDate:Date;
    totalApprovalCount:number;
    approvalCount :number;
    quantity:number;
    isActive:boolean;
    userID:number;
    remarks: string;
    reason: string;
    createdBy:number;
    createdDate:Date;
    modifiedBy:number;
    modifiedDate:Date;
    constructor(){
        this.productID=0;
        this.description="";
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}